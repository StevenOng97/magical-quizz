import { NextRequest, NextResponse } from "next/server";
import { ChatGroq } from "@langchain/groq";
import { StructuredOutputParser } from "langchain/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import saveQuizz, { SaveQuizzData } from "./saveToDb";
import { z } from "zod";
import { auth } from "@/auth";
// import vectorIndexClient from "@/lib/upstash/vector-index";
import getRedisInstance from "@/lib/upstash/redis";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";

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

export async function POST(req: NextRequest) {
  const { data } = await req.json();

  if (!data) {
    return NextResponse.json({ error: "Data not found" }, { status: 500 });
  }

  const { id, fileUrl } = data;

  const session = await auth();
  const userId = session?.user?.id;

  const response = await fetch(fileUrl);
  const pdfBlob = await response.blob();
  const loader = new WebPDFLoader(pdfBlob);
  const docs = await loader.load();

  const selectedDocuments = docs.filter((doc) => doc.pageContent !== undefined);
  const texts = selectedDocuments.map((doc) => doc.pageContent);
  const joinnedText = texts.join("\n");

  const redisClient = getRedisInstance();

  try {
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
    const { quizzId } = await saveQuizz(result);
    redisClient.hsetnx(`quizz-${id}`, "data", joinnedText);
    redisClient.hsetnx(`quizz-${id}`, "quizzId", quizzId);

    return NextResponse.json({ quizzId }, { status: 200 });
  } catch (e: any) {
    await redisClient.hsetnx(`quizz-${data}`, "isSuccess", false);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
