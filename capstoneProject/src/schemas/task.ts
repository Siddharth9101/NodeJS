import z from "zod";

export const taskSchema = z.object({
  title: z.string().min(3).max(100),
});

export const updateAdminTaskSchema = z.object({
  status: z.enum(["TODO", "IN_PROGRESS", "RESOLVED"]),
});

export const taskParams = z.object({
  taskId: z.uuid(),
});

export const taskQueryParams = z.object({
  search: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "RESOLVED"]).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});
