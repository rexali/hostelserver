import { FavoriteService } from "../controllers/favourite.controller"
import { NextFunction, Request, Response } from "express";
import Favorite from "../models/favorite.model";


export async function getAllFavouritesHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { page } = req.query as unknown as { page: number }
        const favourites = await FavoriteService.getAllFavorites(page);
        const roomCount = await Favorite.count({ col: "id" });

        if (favourites !== null) {
            res.status(200).json({ status: "success", data: { favourites, roomCount }, message: "Favourites found" })
        } else {
            res.status(400).json({ status: "fail", data: null, message: "No favourites found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}