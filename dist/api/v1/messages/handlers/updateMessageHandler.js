"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMessageHandler = updateMessageHandler;
const message_controller_1 = require("../controllers/message.controller");
async function updateMessageHandler(req, res, next) {
    try {
        const id = req.params.id;
        const data = req.body;
        const messageService = new message_controller_1.MessageService({ ...data, id });
        const message = await messageService.updateMessage();
        if (message !== null || undefined) {
            res.status(200).json({ status: "success", data: { message }, message: "Message updated" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No message update" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
