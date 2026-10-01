import { Worker } from "bullmq";
import { DELETE_CLOUDINARY_JOB, QUEUE_NAME } from "../constants/constants.js";
import { deleteBannerImageFromCloudinary } from "../lib/cloudinary.js";
import { bullmqConnection } from "../lib/redis.js";
import { logger } from "../lib/logger.js";

const deleteCloudinaryImgWorker = new Worker(
  QUEUE_NAME,
  async (job) => {
    if (job.name !== DELETE_CLOUDINARY_JOB) {
      return;
    }

    const data = job.data as { publicId: string };

    await deleteBannerImageFromCloudinary(data.publicId);
  },
  {
    connection: bullmqConnection,
  },
);

deleteCloudinaryImgWorker.on("completed", (job) => {
  logger.info(`cloudinary delete job completed, ${job.id}`);
});

deleteCloudinaryImgWorker.on("failed", (job, err) => {
  logger.error(
    { err, jobId: job?.id },
    `cloudinary delete job failed ${job?.id}`,
  );
});

logger.info("delete cloudinary image worker started");
