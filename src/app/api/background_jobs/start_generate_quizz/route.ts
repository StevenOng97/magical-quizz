import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import getRedisInstance from "@/lib/upstash/redis";
import getQStashClient from "@/lib/upstash/qstash";
import getSupabaseClient from "@/lib/supabase/client";

// const embeddings = new HuggingFaceInferenceEmbeddings({
//   apiKey: process.env.HF_API_KEY,
//   model: "sentence-transformers/all-MiniLM-L6-v2",
// });

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

  try {
    const redisClient = getRedisInstance();
    redisClient.hset(`quizz-${id}`, {
      id,
    });
    const qstashClient = getQStashClient();
    const host = req.headers.get("host");
    const protocol = host!.startsWith("localhost") ? "http" : "https";
    const url = `${protocol}://${host}`;
    const { messageId } = await qstashClient.publishJSON({
      url: `${url}/api/quizz/generate`,
      body: {
        data: {
          id,
          fileName,
        },
      },
    });

    return NextResponse.json({ messageId }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  // Enhance later with Vector and LLM Answer in Conservation
  // const vector = await embeddings.embedQuery(joinnedText);
  // const id = uuidv4();

  // const record = {
  //   id,
  //   vector,
  //   metadata: {
  //     id,
  //     type: "pdf-vector",
  //   },
  // };

  // try {
  //   // await vectorIndexClient.upsert(record);
  //   const redisClient = getRedisInstance();

  // await redisClient.hset(`quizz-${id}`, {
  //   id,
  //   data: joinnedText,
  // });
  // } catch (error) {
  //   console.error(error);
  // }
}
