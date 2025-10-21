import { RoomService } from "../controllers/room.controller"
import { NextFunction, Request, Response } from "express";
import { getNewlyAddedRooms } from "../helpers/getNewlyAddedRooms";
import { getPopularRooms } from "../helpers/getPopularRooms";
import { getRecommendedRooms } from "../helpers/getRecommendedRooms";
import { getRecentlyBookedRooms } from "../helpers/recentlyBookedRooms";
import { getFeaturedRooms } from "../helpers/getFeaturedRooms";
import Room from "../models/room.model";
import Favorite from "../../favourites/models/favorite.model";


export async function getRoomsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const term = req.query?.term as string;
        const page = req.query?.page as unknown as number;
        const rooms = await RoomService.getRooms(page) as any;
        const roomCount = await Room.count({ col: "id" });
        let favRooms = await Favorite.findAll({attributes:["RoomId","UserId"]});
        let data = rooms.map((room: any) => room.get({ plain: true }))?.map((room: any) => ({
            ...room,
            likes:favRooms.filter((rm:any)=>rm.RoomId===room.id).map(rm=>rm.UserId),
            rating: room?.Reviews?.map((rm: any) => rm?.rating).reduce((prev: any, cur: any) => prev + cur, 0) / (room?.Reviews?.length ?? 0)
        }));
         
        if (rooms !== null) {
            if (rooms?.length) {
                res.status(200).json({
                    status: "success",
                    data: {
                        roomCount,
                        rooms:data,
                        newRooms: await getNewlyAddedRooms(),
                        popularRooms: await getPopularRooms(),
                        recommendedRooms: await getRecommendedRooms(term),
                        bookedRooms: await getRecentlyBookedRooms(),
                        featuredRooms: await getFeaturedRooms()
                    },
                    message: "Room(s) found"
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