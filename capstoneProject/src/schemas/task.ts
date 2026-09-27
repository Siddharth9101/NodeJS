import z from "zod";

export const taskSchema = z.object({
  title: z.string().min(3).max(100),
});

export const taskParams = z.object({
  taskId: z.uuid(),
});
