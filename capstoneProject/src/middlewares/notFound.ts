import { Request, Response, NextFunction } from "express";

export function notFound(_req: Request, res: Response, _next: NextFunction) {
  res.status(404).json({
    success: false,
    message: "route not found",
  });
}
