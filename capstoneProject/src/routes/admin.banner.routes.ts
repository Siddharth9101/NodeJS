import { Router } from "express";
import * as adminBannerController from "../controllers/admin.banner.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireAdmin } from "../middlewares/admin.middleware.js";
import { uploadSingleBannerImage } from "../middlewares/banner.middleware.js";

export const adminBannerRouter = Router();

adminBannerRouter.use(authenticate, requireAdmin);

adminBannerRouter.post(
  "/",
  uploadSingleBannerImage,
  adminBannerController.upload,
);

adminBannerRouter.get("/", adminBannerController.getAll);
adminBannerRouter.delete("/:id", adminBannerController.deleteBanner);
