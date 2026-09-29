import { Router } from "express";
import * as notificationController from "../controllers/notification.controller";

const router = Router();

router.post("/", notificationController.notificaitonController);

export default router;
