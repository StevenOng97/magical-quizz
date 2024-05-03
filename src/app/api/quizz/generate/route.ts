import { NextRequest, NextResponse } from "next/server";
import { client } from "@/trigger";
import { getSupabaseClient } from "@/lib/supabase/client";
import getRedisInstance from "@/lib/upstash/redis";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const document = body.get("pdf") as File;
  const supabaseClient = getSupabaseClient();
  const id = uuidv4();
  const fileName = `${document.name}-${id}`;
  const { data, error } = await supabaseClient.storage
    .from("pdfs")
    .upload(fileName, document);

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const user = await currentUser();

  if (!data) {
    return NextResponse.json(
      { error: "Unable to upload PDF to Supabase storage" },
      { status: 500 }
    );
  }

  const redisClient = getRedisInstance();
  redisClient.hset(`quizz-${id}`, {
    id,
  });

  const payload = {
    userId: user?.id,
    fileId: id,
    fileName,
    originalFileName: document.name,
  };

  try {
    await client.sendEvent({
      name: "quizz.generate",
      payload,
    });
    return NextResponse.json({ keyId: id }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
