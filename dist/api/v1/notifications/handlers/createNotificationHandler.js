"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationHandler = createNotificationHandler;
const notificaton_controller_1 = require("../controllers/notificaton.controller");
async function createNotificationHandler(req, res, next) {
    try {
        const data = req.body;
        const notificationService = new notificaton_controller_1.NotificationService(data);
        const notification = await notificationService.createNotification();
        if (notification !== null) {
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
