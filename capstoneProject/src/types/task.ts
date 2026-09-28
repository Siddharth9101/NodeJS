import z from "zod";
import { taskQueryParams } from "../schemas/task.js";

export type Task = {
  id: string;
  title: string;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type Tasks = {
  tasks: Task[];
  page: number;
  limit: number;
  totalTasks: number;
  totalPages: number;
};

export type DbTaskRow = {
  id: string;
  title: string;
  status: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type TaskQuery = z.infer<typeof taskQueryParams>;
