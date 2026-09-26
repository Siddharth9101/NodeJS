import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger.js";
import { AppError } from "../errors/AppError.js";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  logger.error({ err }, `unhandled error, requestId: ${req.requestId}`);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: `internal server error`,
  });
}
