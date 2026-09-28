import { Request, Response, NextFunction } from "express";
import {
  getAllAdminTasksService,
  updateAdminTaskService,
} from "../services/admin.task.service.js";
import {
  taskParams,
  taskQueryParams,
  updateAdminTaskSchema,
} from "../schemas/task.js";

export async function getAdminAllTasksController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsedQuery = taskQueryParams.parse(req.query);

    const tasks = await getAllAdminTasksService(parsedQuery);

    res.status(200).json({
      success: true,
      message: "tasks fetched successfully",
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminTaskController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsedBody = updateAdminTaskSchema.parse(req.body);
    const parsedParams = taskParams.parse(req.params);

    const task = await updateAdminTaskService(
      parsedBody.status,
      parsedParams.taskId,
    );

    res.status(200).json({
      success: true,
      message: "status updated successfully",
      data: { task },
    });
  } catch (err) {
    next(err);
  }
}
