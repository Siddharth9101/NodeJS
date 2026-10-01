import multer from "multer";
import { MAX_FILE_SIZE } from "../constants/constants.js";
import { AppError } from "../errors/AppError.js";

const uploadBanner = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new AppError(400, "only image upload is allowed"));
      return;
    }
    cb(null, true);
  },
});

export const uploadSingleBannerImage = uploadBanner.single("image");
