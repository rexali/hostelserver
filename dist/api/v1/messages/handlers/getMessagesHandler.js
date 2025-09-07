"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesHandler = getMessagesHandler;
const message_controller_1 = require("../controllers/message.controller");
async function getMessagesHandler(req, res, next) {
    try {
        const page = req.query?.page ?? 1;
        const messages = await message_controller_1.MessageService.getMessages(page);
        if (messages !== null || undefined) {
            res.status(200).json({ status: "success", data: { messages }, message: "Messages found " });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No message(s) found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
