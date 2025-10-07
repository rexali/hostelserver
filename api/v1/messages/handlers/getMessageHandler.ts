
import { NextFunction, Request, Response } from "express";
import { MessageType } from "../types/types";
import { MessageService } from "../controllers/message.controller";

export async function getMessageHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const {id } = req.params as unknown as {id:number};
        const message = await MessageService.getMessage(id) as unknown as MessageType;        
        if (message !== null || undefined) {
            res.status(200).json({ status: "success", data: { message}, message: "Notifications found" })
        } else {
            res.status(400).json({ status: "fail", data: null, message: "No message found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}