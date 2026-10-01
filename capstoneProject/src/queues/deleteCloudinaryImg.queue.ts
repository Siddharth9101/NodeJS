import { Queue } from "bullmq";
import { DELETE_CLOUDINARY_JOB, QUEUE_NAME } from "../constants/constants.js";
import { bullmqConnection } from "../lib/redis.js";

const deleteCloudinaryImageQueue = new Queue(QUEUE_NAME, {
  connection: bullmqConnection,
});

export async function addDeleteCloudinaryImgJob(
  publicId: string,
): Promise<void> {
  await deleteCloudinaryImageQueue.add(
    DELETE_CLOUDINARY_JOB,
    { publicId },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 3000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    },
  );
}
