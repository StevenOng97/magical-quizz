import { Message } from "ai";

export interface Chat extends Record<string, any> {
  id: string;
  createdAt: Date;
  quizzId: string;
  messages: Message[];
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string;
    }
>;

export interface AuthResult {
  type: string;
  message: string;
}

export interface User extends Record<string, any> {
  id: string;
  email: string;
  password: string;
  salt: string;
}
