import { NextRequest, NextResponse } from "next/server";
import getRedisInstance from "@/lib/upstash/redis";

export async function GET(req: NextRequest) {
  try {
    const taskId = req.nextUrl.searchParams.get("taskId");
    const redisClient = getRedisInstance();
    const quizzId = await redisClient.hget(`quizz-${taskId}`, "quizzId");
    return NextResponse.json({ quizzId }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
