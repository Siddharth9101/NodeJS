// publish / subscribe
// publisher sends a message
// subscriber listens for the message and receives it
// channel - connects both publisher and subscriber
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";

// const redis = createClient({ url: redisUrl });

const channel = "notifications";

async function run() {
  const publisher = createClient({ url: redisUrl });
  const subscriber = createClient({ url: redisUrl });

  await publisher.connect();
  await subscriber.connect();

  subscriber.subscribe(channel, (msg) => {
    console.log(`message received: ${msg}`);
  });

  const subsCount = await publisher.publish(channel, "Hello this is my msg");

  console.log("subscriber count ", subsCount);
  await subscriber.unsubscribe();
  await subscriber.quit();
  await publisher.quit();
}

run().catch((err) => {
  console.log("demo failed, err", err);
  process.exit(1);
});
