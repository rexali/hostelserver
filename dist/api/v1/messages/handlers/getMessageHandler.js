"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageHandler = getMessageHandler;
const message_controller_1 = require("../controllers/message.controller");
async function getMessageHandler(req, res, next) {
    try {
        const { id } = req.params;
        const message = await message_controller_1.MessageService.getMessage(id);
        if (message !== null || undefined) {
            res.status(200).json({ status: "success", data: { message }, message: "Notifications found" });
        }
        else {
            res.status(400).json({ status: "fail", data: null, message: "No message found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
