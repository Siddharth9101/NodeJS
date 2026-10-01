import { Request, Response, NextFunction } from "express";
import { taskParams, taskSchema } from "../schemas/task.js";
import * as userTaskService from "../services/user.task.service.js";
import { logger } from "../lib/logger.js";

export async function create(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsedData = taskSchema.parse(req.body);

    const task = await userTaskService.create(req.user!.id, parsedData.title);

    logger.info(
      `new task created, taskId: ${task.id}, userId: ${task.userId}, requestId: ${req.requestId}`,
    );

    res.status(201).json({
      success: true,
      message: "task created successfully",
      data: { task },
    });
  } catch (err) {
    next(err);
  }
}

export async function getTasksByUserId(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const tasks = await userTaskService.getAllByUserId(req.user!.id);

    res.status(200).json({
      success: true,
      message: "tasks fetched successfully",
      data: { tasks },
    });
  } catch (err) {
    next(err);
  }
}

export async function getTaskById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsedParams = taskParams.parse(req.params);

    const task = await userTaskService.getByIdAndUserId(
      parsedParams.taskId,
      req.user!.id,
    );

    res.status(200).json({
      success: true,
      message: "task fetched successfully",
      data: { task },
    });
  } catch (err) {
    next(err);
  }
}

export async function updateById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsedParams = taskParams.parse(req.params);

    const parsedBody = taskSchema.parse(req.body);

    const task = await userTaskService.updateByIdAndUserId(
      parsedParams.taskId,
      req.user!.id,
      parsedBody.title,
    );

    logger.info(
      `task title updated, taskId: ${task.id}, userId: ${task.userId}, requestId: ${req.requestId}`,
    );

    res.status(200).json({
      success: true,
      message: "task updated successfully",
      data: { task },
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsedParams = taskParams.parse(req.params);

    const id = await userTaskService.deleteByIdAndUserId(
      parsedParams.taskId,
      req.user!.id,
    );

    logger.info(
      `task title updated, taskId: ${id}, userId: ${req.user?.id}, requestId: ${req.requestId}`,
    );

    res.status(200).json({
      success: true,
      message: "task deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}
