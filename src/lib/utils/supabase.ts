import getSupabaseClient from "../supabase/client";

const getPublicUrlByFileName = (fileName: string, storage: string) => {
  const supabaseClient = getSupabaseClient();
  const { data } = supabaseClient.storage.from(storage).getPublicUrl(fileName);
  return data.publicUrl;
};

export { getPublicUrlByFileName };
