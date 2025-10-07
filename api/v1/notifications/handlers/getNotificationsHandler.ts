
import { NotificationService } from "../controllers/notificaton.controller"
import { NextFunction, Request, Response } from "express";
import { isNotificationsRead } from "../utils/isNotificationRead";
import { NotificationType } from "../types/types";
import Notification from "../models/notification.model";

export async function getNotificationsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const notificationCount = await Notification.count({ col: "id" });
        const {page } = req.query as unknown as {page:number};
        const notifications = await NotificationService.getNotifications(page) as unknown as Array<NotificationType>;
        if (notifications !== null || undefined) {
            res.status(200).json({ status: "success", data: { notifications, notificationCount,  read: isNotificationsRead(notifications)}, message: "Notifications found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No notification found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}