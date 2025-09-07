"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getNotificationsHandler_1 = require("../handlers/getNotificationsHandler");
const createNotificationHandler_1 = require("../handlers/createNotificationHandler");
const removeNotificationHandler_1 = require("../handlers/removeNotificationHandler");
const updateNoticationHandler_1 = require("../handlers/updateNoticationHandler");
const getNotificationHandler_1 = require("../handlers/getNotificationHandler");
const notificationRouter = express_1.default.Router();
notificationRouter.get("/", getNotificationsHandler_1.getNotificationsHandler);
notificationRouter.get("/:id", getNotificationHandler_1.getNotificationHandler);
notificationRouter.post("/", createNotificationHandler_1.createNotificationHandler);
notificationRouter.delete("/:id", removeNotificationHandler_1.removeNotificationHandler);
notificationRouter.patch("/:id", updateNoticationHandler_1.updateNotificationHandler);
exports.default = notificationRouter;
