import { AppError } from "../errors/AppError.js";
import {
  createTaskRepo,
  deleteTaskByIdRepo,
  findTaskByIdAndUserId,
  findTasksByUserId,
  updateTaskByIdAndUserIdRepo,
} from "../repositories/user.task.repository.js";
import { Task } from "../types/task.js";

export async function createTaskService(
  userId: string,
  title: string,
): Promise<Task> {
  return createTaskRepo(userId, title);
}

export async function getTasksByUserIdService(userId: string): Promise<Task[]> {
  return findTasksByUserId(userId);
}

export async function getTaskByIdAndUserId(
  taskId: string,
  userId: string,
): Promise<Task> {
  const task = await findTaskByIdAndUserId(taskId, userId);
  if (!task) {
    throw new AppError(404, "task not found");
  }

  return task;
}

export async function updateTaskByIdAndUserIdService(
  taskId: string,
  userId: string,
  title: string,
): Promise<Task> {
  const task = await updateTaskByIdAndUserIdRepo(taskId, userId, title);
  if (!task) {
    throw new AppError(404, "task not found");
  }

  return task;
}

export async function deleteTaskByIdService(
  taskId: string,
  userId: string,
): Promise<void> {
  await deleteTaskByIdRepo(taskId, userId);
}
