import { Request, Response, NextFunction } from "express";
import * as adminTaskService from "../services/admin.task.service.js";
import {
  taskParams,
  taskQueryParams,
  updateAdminTaskSchema,
} from "../schemas/task.js";
import { logger } from "../lib/logger.js";

export async function getAllAdminTasks(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsedQuery = taskQueryParams.parse(req.query);

    const tasks = await adminTaskService.getAll(parsedQuery);

    res.status(200).json({
      success: true,
      message: "tasks fetched successfully",
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateAdminTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsedBody = updateAdminTaskSchema.parse(req.body);
    const parsedParams = taskParams.parse(req.params);

    const task = await adminTaskService.updateById(
      parsedBody.status,
      parsedParams.taskId,
    );

    logger.info(
      `task status updated, taskId: ${task.id}, requestId: ${req.requestId}`,
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
