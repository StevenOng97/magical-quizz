import { Client } from "@upstash/qstash";

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN!,
});

function getQStashClient() {
  return qstashClient;
}

export default getQStashClient;
