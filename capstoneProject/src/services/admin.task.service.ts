import { AppError } from "../errors/AppError.js";
import * as adminTaskRepo from "../repositories/admin.task.repository.js";
import { Task, TaskQuery, Tasks } from "../types/task.js";

export async function getAll(query: TaskQuery): Promise<Tasks> {
  return await adminTaskRepo.findAll(query);
}

export async function updateById(
  status: string,
  taskId: string,
): Promise<Task> {
  const task = await adminTaskRepo.updateById(status, taskId);
  if (!task) {
    throw new AppError(404, "task not found");
  }
  return task;
}
