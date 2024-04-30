import "server-only";

import {
  createAI,
  getMutableAIState,
  render,
  createStreamableValue,
} from "ai/rsc";
import OpenAI from "openai";

import { BotMessage } from "@/components/stocks";

import { v4 as uuidv4 } from "uuid";
import { SpinnerMessage, UserMessage } from "@/components/stocks/message";
import { Chat } from "@/lib/types";
import { saveChat } from "@/app/actions/useChat";
import { getSupabaseVectorStore } from "../supabase/client";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function submitUserMessage(content: string) {
  "use server";

  console.log("content:", content);
  const aiState = getMutableAIState();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: uuidv4(),
        role: "user",
        content,
      },
    ],
  });

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
  let textNode: undefined | React.ReactNode;

  const vectorStore = getSupabaseVectorStore();
  const results = await vectorStore.similaritySearch(content, 4);

  const ui = render({
    model: process.env.LLM_MODEL!,
    provider: openai,
    initial: <SpinnerMessage />,
    messages: [
      {
        role: "system",
        content:
          "Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.",
      },
      {
        role: "user",
        content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
              
        \n----------------\n
        ${aiState.get().messages.map((message: any) => ({
          role: message.role,
          content: message.content,
          name: message.name,
        }))}

        CONTEXT:
        ${results.map((r) => r.pageContent).join("\n\n")}
        
        USER INPUT: ${content}`,
      },
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue("");
        textNode = <BotMessage content={textStream.value} />;
      }

      if (done) {
        textStream.done();
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: uuidv4(),
              role: "assistant",
              content,
            },
          ],
        });
      } else {
        textStream.update(delta);
      }

      return textNode;
    },
  });

  return {
    id: uuidv4(),
    display: ui,
  };
}

export type Message = {
  role: "user" | "assistant" | "system" | "function" | "data" | "tool";
  content: string;
  id: string;
  name?: string;
};

export type AIState = {
  messages: Message[];
  quizzId?: string;
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { quizzId: "", messages: [] },
  onSetAIState: async ({ state, done }) => {
    "use server";
    try {
      const { messages, quizzId } = state;

      if (quizzId) {
        const chat: Chat = {
          id: quizzId,
          quizzId,
          createdAt: new Date(),
          messages,
        };

        await saveChat(chat);
      } else {
        return;
      }
    } catch (err) {
      console.log("error:", err);
    }
  },
});

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter((message) => message.role !== "system")
    .map((message, index) => ({
      id: `${aiState.id}-${index}`,
      display:
        message.role === "user" ? (
          <UserMessage>{message.content}</UserMessage>
        ) : (
          <BotMessage content={message.content} />
        ),
    }));
};
