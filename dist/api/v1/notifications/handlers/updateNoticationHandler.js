"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotificationHandler = updateNotificationHandler;
const notificaton_controller_1 = require("../controllers/notificaton.controller");
async function updateNotificationHandler(req, res, next) {
    try {
        const id = req.params.id;
        const data = req.body;
        const notificationService = new notificaton_controller_1.NotificationService({ ...data, id });
        const notification = await notificationService.updateNotification();
        if (notification !== null || undefined) {
            res.status(200).json({ status: "success", data: { notification }, message: "Notification created" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No notification created" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
