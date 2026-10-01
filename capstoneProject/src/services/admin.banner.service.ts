import { AppError } from "../errors/AppError.js";
import {
  clearBannersCache,
  getBannersFromCache,
  setBannersCache,
} from "../lib/bannerCache.js";
import { uploadBannerImageToCloudinary } from "../lib/cloudinary.js";
import { addDeleteCloudinaryImgJob } from "../queues/deleteCloudinaryImg.queue.js";
import * as adminBannerRepo from "../repositories/admin.banner.repository.js";
import { Banner } from "../types/banner.js";

export async function upload(file: Express.Multer.File): Promise<Banner> {
  const { secureUrl, publicId } = await uploadBannerImageToCloudinary(
    file.buffer,
    {
      folder: "nodejsCapstone",
    },
  );

  if (!secureUrl || !publicId) {
    throw new AppError(500, "cloudinary upload failed");
  }

  const banner = await adminBannerRepo.create(secureUrl, publicId);

  await clearBannersCache();

  return banner;
}

export async function getAll(): Promise<Banner[]> {
  const cachedBanners = await getBannersFromCache();
  if (cachedBanners) {
    return cachedBanners;
  }

  const banners = await adminBannerRepo.findAll();

  await setBannersCache(banners);

  return banners;
}

export async function deleteById(id: string): Promise<void> {
  const publicId = await adminBannerRepo.deleteById(id);
  if (!publicId) {
    throw new AppError(404, "no banner found");
  }

  await clearBannersCache();

  // bullmq
  await addDeleteCloudinaryImgJob(publicId);
}
