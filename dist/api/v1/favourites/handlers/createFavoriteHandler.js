"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFavoriteHandler = createFavoriteHandler;
const favourite_controller_1 = require("../controllers/favourite.controller");
async function createFavoriteHandler(req, res, next) {
    try {
        const data = req.body;
        const favouriteService = new favourite_controller_1.FavoriteService(data);
        const favorite = await favouriteService.createFavorite();
        if (favorite !== null || undefined) {
            res.status(200).json({ status: "success", data: { favorite }, message: "Room saved" });
        }
        else {
            res.status(400).json({ status: "fail", data: null, message: "No room saved" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
