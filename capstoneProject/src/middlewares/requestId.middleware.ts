import { Request, Response, NextFunction } from "express";
import crypto from "node:crypto";

export function requestId(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const requestId = crypto.randomUUID();
  req.requestId = requestId;
  next();
}
