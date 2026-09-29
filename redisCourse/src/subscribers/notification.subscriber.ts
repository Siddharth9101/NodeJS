import dotenv from "dotenv";
import { createClient } from "redis";
import { redisClient } from "../redis/client";

dotenv.config();

const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";

const notificationChannel = "notification";

export type NotificationPayload = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
};

export async function publishNotification(
  noti: NotificationPayload,
): Promise<void> {
  await redisClient.publish(notificationChannel, JSON.stringify(noti));
}

const subscriberClient = createClient({ url: redisUrl });

subscriberClient.on("error", (err) => {
  console.log(`subs redis error, err: ${err}`);
});

async function startNotificationSubscriber() {
  await subscriberClient.connect();

  await subscriberClient.subscribe(notificationChannel, (msg) => {
    try {
      const notificaiton = JSON.parse(msg) as NotificationPayload;

      console.log("new notificaiton received");
      console.log(`title: ${notificaiton.title}`);
      console.log(`message: ${notificaiton.message}`);
    } catch {
      console.log(`new notificaiton received, msg: ${msg}`);
    }
  });
}

startNotificationSubscriber().catch((err) => {
  console.log("failed to start noti, err: ", err);
  process.exit(1);
});
