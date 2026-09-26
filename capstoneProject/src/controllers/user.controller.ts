import { NextFunction, Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service.js";
import { AppError } from "../errors/AppError.js";
import { MIN_PASSWORD_LENGTH } from "../constants/constants.js";
import { logger } from "../lib/logger.js";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const reqData = req.body;

    if (
      !reqData?.email ||
      !reqData?.password ||
      typeof reqData?.email !== "string" ||
      typeof reqData?.password !== "string"
    ) {
      throw new AppError(400, "email and password are required");
    }
    const { email, password } = reqData;

    if (!email.includes("@")) {
      throw new AppError(422, "email must be a valid email address");
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new AppError(422, "password must be atleast 6 characters long");
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await registerUser(normalizedEmail, password);

    logger.info(
      `new user registered, id: ${user.id}, requestId: ${req.requestId}`,
    );

    res.status(201).json({
      success: true,
      message: "registration successfull, please login to continue",
    });
  } catch (err) {
    next(err);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const reqData = req.body;

    if (
      !reqData?.email ||
      !reqData?.password ||
      typeof reqData?.email !== "string" ||
      typeof reqData?.password !== "string"
    ) {
      throw new AppError(400, "email and password are required");
    }
    const { email, password } = reqData;

    if (!email.includes("@")) {
      throw new AppError(422, "email must be a valid email address");
    }

    const normalizedEmail = email.toLowerCase().trim();

    const { accessToken } = await loginUser(normalizedEmail, password);

    res.status(200).json({
      success: true,
      message: "log in successfull",
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
}

export async function me(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (err) {
    next(err);
  }
}
