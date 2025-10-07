import { FavoriteService } from "../controllers/favourite.controller"
import { NextFunction, Request, Response } from "express";


export async function createFavoriteHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body;
        const favouriteService = new FavoriteService(data);
        const favorite = await favouriteService.createFavorite();
        if (favorite !== null || undefined) {
            res.status(200).json({ status: "success", data: { favorite }, message: "Room saved" })
        } else {
            res.status(400).json({ status: "fail", data: null, message: "No room saved" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}