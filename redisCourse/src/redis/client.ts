import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";

export const redisClient = createClient({ url: redisUrl });

redisClient.on("connect", () => console.log("redis is connected"));
redisClient.on("error", (err) => console.log("redis is connected, err: ", err));
redisClient.on("end", () => console.log("redis connection closed"));

export async function connectRedis(): Promise<void> {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  const pong = await redisClient.ping();
  console.log("redis ping ", pong);
}

export async function disconnectRedis(): Promise<void> {
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
}
