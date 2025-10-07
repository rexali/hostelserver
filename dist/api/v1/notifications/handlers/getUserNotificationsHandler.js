"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserNotificationsHandler = getUserNotificationsHandler;
const notificaton_controller_1 = require("../controllers/notificaton.controller");
const isNotificationRead_1 = require("../utils/isNotificationRead");
const notification_model_1 = __importDefault(require("../models/notification.model"));
async function getUserNotificationsHandler(req, res, next) {
    try {
        const { page } = req.query;
        const userId = req.params.id;
        const notificationCount = await notification_model_1.default.count({ col: "id" });
        const notifications = await notificaton_controller_1.NotificationService.getUserNotifications(userId, page);
        if (notifications !== null || undefined) {
            res.status(200).json({ status: "success", data: { notifications, notificationCount, read: (0, isNotificationRead_1.isNotificationsRead)(notifications) }, message: "Notifications found" });
        }
        else {
            res.status(400).json({ status: "fail", data: null, message: "No notification found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error.message });
    }
}
