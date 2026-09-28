import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";
import * as adminTaskController from "../controllers/admin.task.controller.js";

export const adminTaskRouter = Router();

adminTaskRouter.use(authenticate, requireAdmin);

adminTaskRouter.get("/", adminTaskController.getAllAdminTasks);
adminTaskRouter.patch("/:taskId", adminTaskController.updateAdminTask);
