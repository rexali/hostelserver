"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMessageHandler = removeMessageHandler;
const message_controller_1 = require("../controllers/message.controller");
async function removeMessageHandler(req, res, next) {
    try {
        const { id } = req.params;
        const message = await message_controller_1.MessageService.removeMessage(id);
        if (message !== null || undefined) {
            res.status(200).json({ status: "success", data: { message }, message: "Message removed " });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No message deleted" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
