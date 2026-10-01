import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/register", userController.register);
authRouter.post("/login", userController.login);
authRouter.get("/me", authenticate, userController.me);
authRouter.get("/google", userController.googleAuth);
authRouter.get("/google/callback", userController.googleLogin);
