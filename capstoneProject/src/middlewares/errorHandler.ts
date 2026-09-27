import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger.js";
import { AppError } from "../errors/AppError.js";
import z, { ZodError } from "zod";

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

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: z.prettifyError(err),
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: `internal server error`,
  });
}
