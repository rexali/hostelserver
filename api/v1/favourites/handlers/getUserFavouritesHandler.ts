import { FavoriteService } from "../controllers/favourite.controller"
import { NextFunction, Request, Response } from "express";
import Favorite from "../models/favorite.model";


export async function getUserFavouritesHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params as unknown as { id: number };
        const { page } = req.query as unknown as { page: number };
        const roomCount = await Favorite.count({ col: "id" });
        const favourites = await FavoriteService.getUserFavorites(id,page);
        if (favourites !== null) {
            res.status(200).json({ status: "success", data: { favourites,roomCount }, message: "Favourites found" })
        } else {
            res.status(400).json({ status: "fail", data: null, message: "No favourites found" })
        }
    } catch (error:any) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error.message })
    }

}