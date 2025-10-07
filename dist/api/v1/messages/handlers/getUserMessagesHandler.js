"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserMessagesHandler = getUserMessagesHandler;
const message_controller_1 = require("../controllers/message.controller");
const message_model_1 = __importDefault(require("../models/message.model"));
async function getUserMessagesHandler(req, res, next) {
    try {
        const page = req.query?.page ?? 1;
        const userId = req.params.id;
        const messageCount = await message_model_1.default.count({ col: "id" });
        const messages = await message_controller_1.MessageService.getUserMessages(userId, page);
        if (messages !== null || undefined) {
            res.status(200).json({ status: "success", data: { messages, messageCount }, message: "Messages found " });
        }
        else {
            res.status(400).json({ status: "fail", data: null, message: "No message(s) found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error });
    }
}
