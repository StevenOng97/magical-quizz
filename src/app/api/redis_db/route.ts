import { NextRequest, NextResponse } from "next/server";
import getQStashClient from "@/lib/upstash/qstash";
import getRedisInstance from "@/lib/upstash/redis";

export async function GET(req: NextRequest) {
  try {
    const messageId = req.nextUrl.searchParams.get("messageId");
    const objectName = req.nextUrl.searchParams.get("objectName");
    const qstashClient = getQStashClient();
    const message = await qstashClient.messages.get(`${messageId}`);
    const { data } = JSON.parse(message.body!);
    const redisClient = getRedisInstance();
    const objectId = await redisClient.hget(`${objectName}-${data.id}`, "id");
    return NextResponse.json({ objectId }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
