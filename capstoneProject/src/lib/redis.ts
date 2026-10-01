import Redis from "ioredis";
import { env } from "../config/env.js";

export const redis = new Redis.default(env.redisUrl);

const redisUrl = new URL(env.redisUrl);

export const bullmqConnection = {
  host: redisUrl.hostname,
  port: redisUrl.port,
  maxRetriesPerRequest: null,
};
