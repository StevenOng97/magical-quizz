import { Message } from "ai";

export interface Chat extends Record<string, any> {
  id: string;
  createdAt: Date;
  quizzId: string;
  messages: Message[];
}
