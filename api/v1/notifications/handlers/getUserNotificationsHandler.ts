
import { NotificationService } from "../controllers/notificaton.controller"
import { NextFunction, Request, Response } from "express";
import { isNotificationsRead } from "../utils/isNotificationRead";
import { NotificationType } from "../types/types";
import Notification from "../models/notification.model";

export async function getUserNotificationsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { page } = req.query as unknown as { page: number };
        const userId = req.params.id as unknown as number;
        const notificationCount = await Notification.count({ col: "id" });
        const notifications = await NotificationService.getUserNotifications(userId, page) as unknown as Array<NotificationType>;
        if (notifications !== null || undefined) {
            res.status(200).json({ status: "success", data: { notifications, notificationCount, read: isNotificationsRead(notifications) }, message: "Notifications found" })
        } else {
            res.status(400).json({ status: "fail", data: null, message: "No notification found" })
        }
    } catch (error: any) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error.message })
    }

}