import { ChatGroq } from "@langchain/groq";
import { getSupabaseClient } from "../supabase/client";

const getPublicUrlByFileName = (fileName: string, storage: string) => {
  const supabaseClient = getSupabaseClient();
  const { data } = supabaseClient.storage.from(storage).getPublicUrl(fileName);
  return data.publicUrl;
};

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  modelName: process.env.LLM_MODEL,
});

export { getPublicUrlByFileName, model };
