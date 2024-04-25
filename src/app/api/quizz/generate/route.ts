import { NextRequest, NextResponse } from "next/server";
import { client } from "@/trigger";

export async function POST(req: NextRequest) {
  const { data } = await req.json();

  if (!data) {
    return NextResponse.json({ error: "Data not found" }, { status: 500 });
  }

  const { id, fileName, userId } = data;

  const payload = {
    userId,
    fileId: id,
    fileName,
  };

  try {
    await client.sendEvent({
      name: "quizz.generate",
      payload,
    });
    return NextResponse.json({ isSuccess: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
