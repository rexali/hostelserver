"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFavoriteHandler = createFavoriteHandler;
const favourite_controller_1 = require("../controllers/favourite.controller");
async function createFavoriteHandler(req, res, next) {
    try {
        const data = req.body;
        const favouriteService = new favourite_controller_1.FavoriteService(data);
        const favorite = await favouriteService.createFavorite();
        if (favorite !== null) {
            res.status(200).json({ status: "success", data: { favorite }, message: "Favourtite found" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No favorite found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
