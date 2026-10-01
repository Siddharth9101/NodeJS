import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env.js";
import { AppError } from "../errors/AppError.js";

type GoogleUserProfile = {
  googleId: string;
  email: string;
};

const googleOAuthClient = new OAuth2Client(
  env.googleClientId,
  env.googleClientSecret,
  env.googleCallbackUrl,
);

export function getGoogleAuthUrl(): string {
  return googleOAuthClient.generateAuthUrl({
    scope: ["openid", "email", "profile"],
    access_type: "online",
    prompt: "select_account",
  });
}

export async function getGoogleUserFromAuthCode(
  code: string,
): Promise<GoogleUserProfile> {
  if (!code) {
    throw new AppError(400, "google auth code is required");
  }

  const { tokens } = await googleOAuthClient.getToken(code);

  if (!tokens.id_token) {
    throw new AppError(401, "google login failed");
  }

  const ticketInfo = await googleOAuthClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: env.googleClientId,
  });

  const payload = ticketInfo.getPayload();

  if (!payload?.sub || !payload?.email) {
    throw new AppError(401, "google login failed");
  }

  return {
    googleId: payload.sub,
    email: payload.email.toLowerCase().trim(),
  };
}
