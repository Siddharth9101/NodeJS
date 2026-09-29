import { Request, Response, NextFunction } from "express";
import { redisClient } from "../redis/client";

const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX_REQUEST = 5;

export async function productRateLimiter(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    // each ip will get its own counter in redis
    const ip = req.ip;
    const rateLimitKey = `rate_limit:products:${ip}`;

    const reqCount = await redisClient.incr(rateLimitKey);

    if (reqCount === 1) {
      await redisClient.expire(rateLimitKey, RATE_LIMIT_WINDOW_SECONDS);
    }

    res.setHeader("X-RateLimit-Limit", RATE_LIMIT_MAX_REQUEST);
    res.setHeader(
      "X-RateLimit-Remaining",
      Math.max(0, RATE_LIMIT_MAX_REQUEST - reqCount),
    );

    if (reqCount > RATE_LIMIT_MAX_REQUEST) {
      res.status(429).json({
        success: false,
        message: "Too many requests",
      });
      return;
    }
    next();
  } catch (err) {
    next(err);
  }
}
