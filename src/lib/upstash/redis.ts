import { Redis } from "@upstash/redis";

// Create a single instance of the Redis client
const redis = Redis.fromEnv();

// Function to get the Redis instance
function getRedisInstance() {
  return redis;
}

export default getRedisInstance; 