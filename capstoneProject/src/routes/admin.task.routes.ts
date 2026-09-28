import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";
import {
  getAdminAllTasksController,
  updateAdminTaskController,
} from "../controllers/admin.task.controller.js";

export const adminTaskRouter = Router();

adminTaskRouter.use(authenticate, requireAdmin);

adminTaskRouter.get("/", getAdminAllTasksController);
adminTaskRouter.patch("/:taskId", updateAdminTaskController);
