import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  createController,
  deleteByIdController,
  getTaskByIdController,
  getTasksByUserIdController,
  updateByIdController,
} from "../controllers/user.task.controller.js";

export const userTaskRouter = Router();

userTaskRouter.use(authenticate);

userTaskRouter
  .route("/")
  .get(getTasksByUserIdController)
  .post(createController);
userTaskRouter
  .route("/:taskId")
  .get(getTaskByIdController)
  .patch(updateByIdController)
  .delete(deleteByIdController);
