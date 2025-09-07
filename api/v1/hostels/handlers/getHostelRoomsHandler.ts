import { HostelService } from "../controllers/hostel.controller"
import { NextFunction, Request, Response } from "express";


export async function getHostelRoomsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params as unknown as { id: number };
        const { page } = req.query as unknown as { page: number };
        const hotel = await HostelService.getHostelRooms(id, page);
        if (hotel !== null) {
            res.status(200).json({ status: "success", data: { hotel }, message: "Hotel's room collected" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No rooms found for the hotel" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}