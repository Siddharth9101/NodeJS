import { TokenPayload } from "./user.ts";

declare global {
  namespace Express {
    interface Request {
      requestId: string;
      user?: TokenPayload;
    }
  }
}

export {};
