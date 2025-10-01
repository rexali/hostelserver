import { RoomService } from "../controllers/room.controller"
import { NextFunction, Request, Response } from "express";


export async function getRoomHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params as unknown as { id: number };
        const room = await RoomService.getRoom(id);
        if (room !== null) {
            res.status(200).json({ status: "success", data: { room }, message: "Room found" })
        } else {
            res.status(404).json({ status: "fail", data: null, message: "No room found" })
        }
    } catch (error: any) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error.message })
    }
}