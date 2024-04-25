import { Index } from "@upstash/vector";

const vectorIndexClient = new Index({
  url: process.env.VECTOR_INDEX_URL!,
  token: process.env.VECTOR_INDEX_TOKEN!,
});

export default vectorIndexClient;
