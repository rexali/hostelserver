import express from "express";
import { getNotificationsHandler } from "../handlers/getNotificationsHandler";
import { createNotificationHandler } from "../handlers/createNotificationHandler";
import { removeNotificationHandler } from "../handlers/removeNotificationHandler";
import { updateNotificationHandler } from "../handlers/updateNoticationHandler";
import { getUserNotificationsHandler } from "../handlers/getUserNotificationsHandler";

const notificationRouter = express.Router();

notificationRouter.get("/", getNotificationsHandler);
notificationRouter.get("/:id", getUserNotificationsHandler);
notificationRouter.post("/",createNotificationHandler);
notificationRouter.delete("/:id",removeNotificationHandler);
notificationRouter.patch("/:id",updateNotificationHandler);

export default notificationRouter;