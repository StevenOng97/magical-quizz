import { google } from "googleapis";
import { signIn } from "@/auth";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    const auth = new google.auth.OAuth2({
      clientId,
      clientSecret,
      redirectUri: "http://localhost:3000/api/auth/callback/google",
    });

    const url = auth.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: ["https://www.googleapis.com/auth/forms"],
    });

    console.log("url;", url);
    await signIn("google", { callbackUrl: url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
