"use server";
import { type Chat } from "@/lib/types";
import getRedisInstance from "@/lib/upstash/redis";

const redisClient = getRedisInstance();

export async function getChat(quizzId: string) {
  const chat = await redisClient.hgetall<Chat>(`chat:${quizzId}`);

  if (!chat || (quizzId && chat.quizzId !== quizzId)) {
    return null;
  }

  return chat;
}

export async function saveChat(chat: Chat) {
  if (chat.quizzId) {
    const pipeline = redisClient.pipeline();
    pipeline.hmset(`chat:${chat.id}`, chat);
    pipeline.zadd(`quizz:chat:${chat.quizzId}`, {
      score: Date.now(),
      member: `chat:${chat.id}`,
    });
    await pipeline.exec();
  } else {
    return;
  }
}
