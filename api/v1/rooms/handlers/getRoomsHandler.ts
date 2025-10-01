import { RoomService } from "../controllers/room.controller"
import { NextFunction, Request, Response } from "express";
import { getNewlyAddedRooms } from "../helpers/getNewlyAddedRooms";
import { getPopularRooms } from "../helpers/getPopularRooms";
import { getRecommendedRooms } from "../helpers/getRecommendedRooms";
import { getRecentlyBookedRooms } from "../helpers/recentlyBookedRooms";
import { getFeaturedRooms } from "../helpers/getFeaturedRooms";


export async function getRoomsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const term = req.query?.term as string;
        const rooms = await RoomService.getRooms();

        if (rooms !== null) {
            if (rooms?.length) {
                res.status(200).json({
                    status: "success", 
                    data: {
                        rooms,
                        newRooms: await getNewlyAddedRooms(),
                        popularRooms: await getPopularRooms(),
                        recommendedRooms: await getRecommendedRooms(term),
                        bookedRooms: await getRecentlyBookedRooms(),
                        featuredRooms: await getFeaturedRooms()
                    }, message: "Room(s) found"
                })
            } else {
                res.status(404).json({ status: "success", data: [], message: "No room found" })
            }
        } else {
            res.status(400).json({ status: "fail", data: null, message: "No room found" })
        }
    } catch (error) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error })
    }

}