import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { verifyAccessToken } from "../lib/jwt.js";

export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    next(new AppError(401, "access token is required"));
    return;
  }

  const token = authHeader.split(" ")[1];

  req.user = verifyAccessToken(token);
  next();
}
