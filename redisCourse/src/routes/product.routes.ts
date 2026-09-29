import { Router } from "express";
import * as productController from "../controllers/product.controller";
import { productRateLimiter } from "../middleware/rateLimit.middleware";

const router = Router();

router.use(productRateLimiter);

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.patch("/:id", productController.updateProduct);

export default router;
