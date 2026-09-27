import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  create,
  deleteById,
  getTaskById,
  getTasksByUserId,
  updateById,
} from "../controllers/user.task.controller.js";

export const userTaskRouter = Router();

userTaskRouter.use(authenticate);

userTaskRouter.route("/").get(getTasksByUserId).post(create);
userTaskRouter
  .route("/:taskId")
  .get(getTaskById)
  .patch(updateById)
  .delete(deleteById);
