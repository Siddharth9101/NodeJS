import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth.service.js";
import { logger } from "../lib/logger.js";
import { userSchema } from "../schemas/user.js";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsedData = userSchema.parse(req.body);

    const { email, password } = parsedData;

    const normalizedEmail = email.toLowerCase().trim();

    const user = await authService.register(normalizedEmail, password);

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
    const parsedData = userSchema.parse(req.body);

    const { email, password } = parsedData;

    const normalizedEmail = email.toLowerCase().trim();

    const { accessToken } = await authService.login(normalizedEmail, password);

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
      message: "user details fetched successfully",
      data: req.user,
    });
  } catch (err) {
    next(err);
  }
}
