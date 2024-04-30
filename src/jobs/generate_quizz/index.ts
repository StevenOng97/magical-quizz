import { eventTrigger } from "@trigger.dev/sdk";
import { client } from "@/trigger";
import { z } from "zod";
import {
  getSupabaseClient,
  getSupabaseVectorStore,
} from "@/lib/supabase/client";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { StructuredOutputParser } from "langchain/output_parsers";
import { ChatGroq } from "@langchain/groq";
import saveQuizz, { SaveQuizzData } from "@/app/api/quizz/generate/saveToDb";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import getRedisInstance from "@/lib/upstash/redis";
import { getPublicUrlByFileName } from "@/lib/utils/supabase";
import { Document } from "@langchain/core/documents";

const quizzSchema = z
  .object({
    name: z.string().min(0).describe("The name of the quizz"),
    description: z.string().min(0).describe("The description of the quizz"),
    questions: z
      .array(
        z.object({
          questionText: z.string().describe("Question"),
          answers: z.array(
            z.object({
              answerText: z
                .string()
                .describe("The answer description of the question"),
              isCorrect: z.boolean().describe("Is the answer correct?"),
            })
          ),
        })
      )
      .describe("The questions of the quizz"),
  })
  .describe("Information a quizz");

client.defineJob({
  id: "generate-quizz",
  name: "Generate quizz from PDF",
  version: "0.0.1",
  trigger: eventTrigger({
    name: "quizz.generate",
    schema: z.object({
      userId: z.string(),
      fileId: z.string(),
      fileName: z.string(),
      originalFileName: z.string(),
    }),
  }),
  run: async (payload, io, ctx) => {
    let documentsWithMetadata: Document<Record<string, any>>[] = [];

    const { fileId, fileName, userId, originalFileName } = payload;

    const joinnedText = await io.runTask("parse-pdf-to-text", async () => {
      const supabaseClient = getSupabaseClient();
      const { data, error } = await supabaseClient.storage
        .from("pdfs")
        .download(fileName);

      const loader = new WebPDFLoader(data as Blob);
      const docs = await loader.load();

      const selectedDocuments = docs.filter(
        (doc) => doc.pageContent !== undefined
      );

      documentsWithMetadata = selectedDocuments.map((document: Document) => {
        return {
          ...document,
          metadata: {
            id: fileId,
          },
        };
      });

      const texts = selectedDocuments.map((doc) => doc.pageContent);
      const joinnedText = texts.join("\n");

      return joinnedText;
    });

    io.runTask("save-to-vector-store", async () => {
      const vectorStore = getSupabaseVectorStore();
      await vectorStore.addDocuments(documentsWithMetadata);
    });

    const quizzData = await io.runTask("prompt-ai", async () => {
      const prompt =
        "given the text which is a summary of the document, generate a quiz based on the text. The quizz should includes atleast 5 questions, each questions includes atleast 4 answers. Return json only that contains a quizz object with fields: name, description and questions. The questions is an array of objects with fields: questionText, answers. The answers is an array of objects with fields: answerText, isCorrect.";

      const parser = StructuredOutputParser.fromZodSchema(quizzSchema);

      const model = new ChatGroq({
        apiKey: process.env.GROQ_API_KEY,
        modelName: process.env.LLM_MODEL,
      });

      const p = ChatPromptTemplate.fromMessages([
        ["system", "Wrap the output in `json` tags\n{format_instructions}"],
        ["human", prompt + "\n" + joinnedText],
      ]);

      const partialedPrompt = await p.partial({
        format_instructions: parser.getFormatInstructions(),
      });

      const chain = partialedPrompt.pipe(model).pipe(parser);

      const result: SaveQuizzData = await chain.invoke({});
      result.userId = userId;
      return result;
    });

    await io.runTask("save-to-db", async () => {
      const redisClient = getRedisInstance();
      const filePath = getPublicUrlByFileName(fileName, "pdfs");
      const { quizzId } = await saveQuizz(
        quizzData,
        filePath,
        originalFileName
      );
      redisClient.hsetnx(`quizz-${fileId}`, "data", joinnedText);
      redisClient.hsetnx(`quizz-${fileId}`, "quizzId", quizzId);
    });
  },
});
