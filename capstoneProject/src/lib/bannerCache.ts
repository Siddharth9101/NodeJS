import {
  ADMIN_BANNERS_CACHE_KEY,
  ADMIN_BANNERS_CACHE_TTL,
} from "../constants/constants.js";
import { Banner } from "../types/banner.js";
import { redis } from "./redis.js";

export async function getBannersFromCache(): Promise<Banner[] | null> {
  const cacheData = await redis.get(ADMIN_BANNERS_CACHE_KEY);
  return cacheData !== null ? (JSON.parse(cacheData) as Banner[]) : null;
}

export async function setBannersCache(banners: Banner[]): Promise<void> {
  await redis.set(
    ADMIN_BANNERS_CACHE_KEY,
    JSON.stringify(banners),
    "EX",
    ADMIN_BANNERS_CACHE_TTL,
  );
}

export async function clearBannersCache(): Promise<void> {
  await redis.del(ADMIN_BANNERS_CACHE_KEY);
}
