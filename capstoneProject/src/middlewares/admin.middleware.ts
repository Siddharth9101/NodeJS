import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export function requireAdmin(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  if (req.user?.role !== "ADMIN") {
    next(new AppError(403, "admin access required"));
    return;
  }
  next();
}
