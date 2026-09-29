import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";

const redis = createClient({ url: redisUrl });

async function run() {
  await redis.connect();
  console.log("connected to redis");
  console.log("Ping", await redis.ping());
}

const dbProducts = ["keyborad", "mouse", "monitor"];

run()
  .then(async () => {
    // cache aside pattern
    const cacheKey = "products";
    const cacheTtl = 60;

    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("cache hit");
      console.log(JSON.parse(cached));
    } else {
      console.log("cache miss");
      const products = dbProducts;
      await redis.setEx(cacheKey, cacheTtl, JSON.stringify(products));
      console.log(products);
    }
    await redis.quit();
  })
  .catch((err) => {
    console.log("demo failed, err", err);
    process.exit(1);
  });
