"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getMessagesHandler_1 = require("../handlers/getMessagesHandler");
const createMessageHandler_1 = require("../handlers/createMessageHandler");
const removeMessageHandler_1 = require("../handlers/removeMessageHandler");
const updateMessageHandler_1 = require("../handlers/updateMessageHandler");
const messageRouter = express_1.default.Router();
messageRouter.get("/", getMessagesHandler_1.getMessagesHandler);
messageRouter.post("/", createMessageHandler_1.createMessageHandler);
messageRouter.delete("/:id", removeMessageHandler_1.removeMessageHandler);
messageRouter.patch("/:id", updateMessageHandler_1.updateMessageHandler);
exports.default = messageRouter;
