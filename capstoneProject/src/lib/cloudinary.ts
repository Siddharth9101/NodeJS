import { v2 as cloudinary } from "cloudinary";
import { CloudinaryUploadResult } from "../types/cloudinary.js";
import { env } from "../config/env.js";

const cloud_name = env.cloudinaryCloudName;
const api_key = env.cloudinaryApiKey;
const api_secret = env.cloudinaryApiSecret;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

export async function uploadBannerImageToCloudinary(
  buffer: Buffer,
  options?: { folder?: string },
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: options?.folder },
      (err, res) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({
          secureUrl: res?.secure_url ?? "",
          publicId: res?.public_id ?? "",
        });
      },
    );

    uploadStream.end(buffer);
  });
}

export async function deleteBannerImageFromCloudinary(
  publicId: string,
): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}
