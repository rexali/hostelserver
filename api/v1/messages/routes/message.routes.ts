import express from "express";
import { createMessageHandler } from "../handlers/createMessageHandler";
import { removeMessageHandler } from "../handlers/removeMessageHandler";
import { updateMessageHandler } from "../handlers/updateMessageHandler";
import { getMessageHandler } from "../handlers/getMessageHandler";
import { getMessagesHandler } from "../handlers/getMessagesHandler";
import { getUserMessagesHandler } from "../handlers/getUserMessagesHandler";

const messageRouter = express.Router();

messageRouter.get("/:id/user", getUserMessagesHandler);
messageRouter.get("/:id", getMessageHandler);
messageRouter.get("/", getMessagesHandler);
messageRouter.post("/", createMessageHandler);
messageRouter.delete("/:id", removeMessageHandler);
messageRouter.patch("/:id", updateMessageHandler);

export default messageRouter;