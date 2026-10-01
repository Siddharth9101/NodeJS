import { Router } from "express";
import { healthRouter } from "./health.routes.js";
import { authRouter } from "./auth.routes.js";
import { userTaskRouter } from "./user.task.routes.js";
import { adminTaskRouter } from "./admin.task.routes.js";
import { adminBannerRouter } from "./admin.banner.routes.js";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/tasks", userTaskRouter);
apiRouter.use("/admin/tasks", adminTaskRouter);
apiRouter.use("/admin/banners", adminBannerRouter);
