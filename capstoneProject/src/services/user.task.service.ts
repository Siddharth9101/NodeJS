import { AppError } from "../errors/AppError.js";
import * as userTaskRepo from "../repositories/user.task.repository.js";
import { Task } from "../types/task.js";

export async function create(userId: string, title: string): Promise<Task> {
  return userTaskRepo.create(userId, title);
}

export async function getAllByUserId(userId: string): Promise<Task[]> {
  return userTaskRepo.findAllByUserId(userId);
}

export async function getByIdAndUserId(
  taskId: string,
  userId: string,
): Promise<Task> {
  const task = await userTaskRepo.findByIdAndUserId(taskId, userId);
  if (!task) {
    throw new AppError(404, "task not found");
  }

  return task;
}

export async function updateByIdAndUserId(
  taskId: string,
  userId: string,
  title: string,
): Promise<Task> {
  const task = await userTaskRepo.updateByIdAndUserId(taskId, userId, title);
  if (!task) {
    throw new AppError(404, "task not found");
  }

  return task;
}

export async function deleteByIdAndUserId(
  taskId: string,
  userId: string,
): Promise<void> {
  await userTaskRepo.deleteByIdAndUserId(taskId, userId);
}
