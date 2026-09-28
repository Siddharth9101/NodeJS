import { AppError } from "../errors/AppError.js";
import {
  findAllAdminTasksRepo,
  updateAdminTaskRepo,
} from "../repositories/admin.task.repository.js";
import { Task, TaskQuery, Tasks } from "../types/task.js";

export async function getAllAdminTasksService(
  query: TaskQuery,
): Promise<Tasks> {
  return await findAllAdminTasksRepo(query);
}

export async function updateAdminTaskService(
  status: string,
  taskId: string,
): Promise<Task> {
  const task = await updateAdminTaskRepo(status, taskId);
  if (!task) {
    throw new AppError(404, "task not found");
  }
  return task;
}
