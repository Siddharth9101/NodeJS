import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
