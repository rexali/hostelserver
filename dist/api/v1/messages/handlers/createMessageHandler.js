"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageHandler = createMessageHandler;
const message_controller_1 = require("../controllers/message.controller");
async function createMessageHandler(req, res, next) {
    try {
        const data = req.body;
        const mesaageService = new message_controller_1.MessageService(data);
        const message = await mesaageService.createMessage();
        if (message !== null || undefined) {
            // if (await sendMail(
            //     message.recipient,
            //     message.title,
            //     "text",
            //     message.sender,
            //     "",
            //     message.message
            // )) {
            //     res.status(200).json({ status: "success", data: { message }, message: "Message sent" })
            // }
            res.status(200).json({ status: "success", data: { message }, message: "Message sent" });
        }
        else {
            res.status(400).json({ status: "fail", data: null, message: "No message sent" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
