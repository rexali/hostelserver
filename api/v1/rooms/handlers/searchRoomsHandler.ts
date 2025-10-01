import { RoomService } from "../controllers/room.controller"
import { NextFunction, Request, Response } from "express";
import { getFilteredRooms } from "../helpers/getFilteredRooms";


export async function searchRoomsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { page, ...filter } = req.query as unknown as any;
        const result = await RoomService.searchRooms(filter?.location, page ?? 1) as any;
        let rooms = getFilteredRooms(filter, result);
        if (rooms !== null) {
            // Remember Me" for 15 minutes: res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
            res.cookie("rememberme", filter.name, { secure: false, path: "/", expires: new Date(Date.now() + 900000), httpOnly: false })
            res.status(200).json({ status: "success", data: { rooms }, message: "Hotel created" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No hotel created" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}