"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationHandler = getNotificationHandler;
const notificaton_controller_1 = require("../controllers/notificaton.controller");
async function getNotificationHandler(req, res, next) {
    try {
        const { id } = req.params;
        const notification = await notificaton_controller_1.NotificationService.getNotification(id);
        if (notification !== null || undefined) {
            res.status(200).json({ status: "success", data: { notification }, message: "Notifications found" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No notification found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
