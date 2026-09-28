import { PASSWORD_HASH_SALT } from "../constants/constants.js";
import { AppError } from "../errors/AppError.js";
import { signAccessToken } from "../lib/jwt.js";
import * as userRepo from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";
import { User } from "../types/user.js";

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
