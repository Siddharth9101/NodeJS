import z from "zod";

export const userSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
});
