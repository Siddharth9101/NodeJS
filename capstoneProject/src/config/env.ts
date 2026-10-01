import dotenv from "dotenv";

dotenv.config();

function checkRequiredEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env variable for ${value}`);
  }
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 8000),
  isProduction: (process.env.NODE_ENV ?? "development") === "production",
  nodeEnv: process.env.NODE_ENV ?? "development",
  logLevel: process.env.LOG_LEVEL ?? "info",
  databaseUrl: checkRequiredEnvVariable("DATABASE_URL"),
  jwtAccessSecret: checkRequiredEnvVariable("JWT_ACCESS_SECRET"),
  jwtAccessExpiresIn: checkRequiredEnvVariable("JWT_ACCESS_EXPIRES_IN"),
  cloudinaryCloudName: checkRequiredEnvVariable("CLOUDINARY_CLOUD_NAME"),
  cloudinaryApiKey: checkRequiredEnvVariable("CLOUDINARY_API_KEY"),
  cloudinaryApiSecret: checkRequiredEnvVariable("CLOUDINARY_API_SECRET"),
  redisUrl: checkRequiredEnvVariable("REDIS_URL"),
  googleClientId: checkRequiredEnvVariable("GOOGLE_CLIENT_ID"),
  googleClientSecret: checkRequiredEnvVariable("GOOGLE_CLIENT_SECRET"),
  googleCallbackUrl: checkRequiredEnvVariable("GOOGLE_CALLBACK_URL"),
} as const;
