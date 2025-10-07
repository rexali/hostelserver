
import { MessageService } from "../controllers/message.controller"
import { NextFunction, Request, Response } from "express";
import Message from "../models/message.model";

export async function getUserMessagesHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const page = req.query?.page as unknown as number ?? 1;
        const userId = req.params.id as unknown as number;
        const messageCount = await Message.count({ col: "id" });
        const messages = await MessageService.getUserMessages(userId, page);
        if (messages !== null || undefined) {
            res.status(200).json({ status: "success", data: { messages, messageCount }, message: "Messages found " })
        } else {
            res.status(400).json({ status: "fail", data: null, message: "No message(s) found" })
        }
    } catch (error) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error })
    }

}