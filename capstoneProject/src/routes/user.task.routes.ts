import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import * as userController from "../controllers/user.task.controller.js";

export const userTaskRouter = Router();

userTaskRouter.use(authenticate);

userTaskRouter
  .route("/")
  .get(userController.getTasksByUserId)
  .post(userController.create);
userTaskRouter
  .route("/:taskId")
  .get(userController.getTaskById)
  .patch(userController.updateById)
  .delete(userController.deleteById);
