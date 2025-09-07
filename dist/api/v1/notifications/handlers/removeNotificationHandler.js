"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNotificationHandler = removeNotificationHandler;
const notificaton_controller_1 = require("../controllers/notificaton.controller");
async function removeNotificationHandler(req, res, next) {
    try {
        const { id } = req.params;
        const notification = await notificaton_controller_1.NotificationService.removeNotification(id);
        if (notification !== null) {
            res.status(200).json({ status: "success", data: { notification }, message: "Notification removed " });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No notification deleted" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
