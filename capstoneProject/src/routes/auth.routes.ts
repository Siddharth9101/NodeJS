import { Router } from "express";
import { login, me, register } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", authenticate, me);
// 11:48:26
