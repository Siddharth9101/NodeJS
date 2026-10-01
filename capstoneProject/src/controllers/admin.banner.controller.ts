import { AppError } from "../errors/AppError.js";
import { logger } from "../lib/logger.js";
import { deleteBannerParams } from "../schemas/banner.js";
import * as adminBannerService from "../services/admin.banner.service.js";
import { Request, Response, NextFunction } from "express";

export async function upload(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file || !req.file.buffer) {
      throw new AppError(400, "missing/invalid image type");
    }

    const banner = await adminBannerService.upload(req.file);

    logger.info(
      `new banner created, bannerId: ${banner.id}, requestId: ${req.requestId}`,
    );

    res.status(201).json({
      success: true,
      message: "banner uploaded successfully",
      data: {
        banner,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const banners = await adminBannerService.getAll();

    res.status(200).json({
      success: true,
      message: "banners fetched successfully",
      data: {
        banners,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteBanner(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsedId = deleteBannerParams.parse(req.params);

    await adminBannerService.deleteById(parsedId.id);

    logger.info(`banner deleted, requestId: ${req.requestId}`);

    res.status(200).json({
      success: true,
      message: "banner deleted successfully",
    });
  } catch (err) {
    next(err);
  }
}
