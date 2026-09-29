import { Request, Response, NextFunction } from "express";
import { publishNotification } from "../subscribers/notification.subscriber";

export async function notificaitonController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { title, message } = req.body;
    const notificaiton = {
      id: Date.now().toString(),
      title,
      message,
      createdAt: new Date().toISOString(),
    };

    await publishNotification(notificaiton);

    res.status(201).json({
      success: true,
      message: "Notificaiton published successfully",
      data: {
        id: notificaiton.id,
      },
    });
  } catch (error) {
    next(error);
  }
}
