import z from "zod";

export const deleteBannerParams = z.object({
  id: z.uuid(),
});
