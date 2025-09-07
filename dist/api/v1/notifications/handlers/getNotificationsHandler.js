"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationsHandler = getNotificationsHandler;
const notificaton_controller_1 = require("../controllers/notificaton.controller");
const isNotificationRead_1 = require("../utils/isNotificationRead");
async function getNotificationsHandler(req, res, next) {
    try {
        const { page } = req.query;
        const notifications = await notificaton_controller_1.NotificationService.getNotifications(page);
        if (notifications !== null || undefined) {
            res.status(200).json({ status: "success", data: { notifications, sign: (0, isNotificationRead_1.isNotificationsRead)(notifications) }, message: "Notifications found" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No notification found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
