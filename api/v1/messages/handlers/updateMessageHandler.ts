
import { MessageService } from "../controllers/message.controller"
import { NextFunction, Request, Response } from "express";
import { MessageType } from "../types/types";


export async function updateMessageHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const id=req.params.id as unknown as number;
        const data = req.body as MessageType;
        const messageService = new MessageService({...data,id});
        const message = await messageService.updateMessage();
        if (message !== null || undefined) {
            res.status(200).json({ status: "success", data: { message }, message: "Message updated" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No message update" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}