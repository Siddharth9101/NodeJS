import { PASSWORD_HASH_SALT } from "../constants/constants.js";
import { AppError } from "../errors/AppError.js";
import { signAccessToken } from "../lib/jwt.js";
import * as userRepo from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";
import { User } from "../types/user.js";
import { getGoogleAuthUrl, getGoogleUserFromAuthCode } from "../lib/google.js";

export async function register(email: string, password: string): Promise<User> {
  const existingUser = await userRepo.findByEmail(email);

  if (existingUser) {
    throw new AppError(409, "email already present");
  }

  const passwordHash = await bcrypt.hash(password, PASSWORD_HASH_SALT);

  return await userRepo.create(email, passwordHash);
}

export async function login(
  email: string,
  password: string,
): Promise<{ accessToken: string }> {
  const user = await userRepo.findByEmailWithPassword(email);

  if (!user?.passwordHash) {
    throw new AppError(401, "invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new AppError(401, "invalid credentials");
  }

  const accessToken = signAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return { accessToken };
}

export function startGoogleLogin(): string {
  return getGoogleAuthUrl();
}

export async function loginWithGoogle(
  code: string,
): Promise<{ accessToken: string }> {
  const googleProfile = await getGoogleUserFromAuthCode(code);

  let user = await userRepo.findUserByGoogleId(googleProfile.googleId);

  if (!user) {
    user = await userRepo.findByEmail(googleProfile.email);

    if (user) {
      // link this google acc to the existing user
      user = await userRepo.linkGoogleIdToUser(user.id, googleProfile.googleId);
    } else {
      // create new user
      user = await userRepo.createGoogleUser(
        googleProfile.email,
        googleProfile.googleId,
      );
    }
  }

  const accessToken = signAccessToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return { accessToken };
}
