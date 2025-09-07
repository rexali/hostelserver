"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavoritesHandler = getFavoritesHandler;
const favourite_controller_1 = require("../controllers/favourite.controller");
async function getFavoritesHandler(req, res, next) {
    try {
        const { userId } = req.params;
        const { page } = req.query;
        const favorite = await favourite_controller_1.FavoriteService.getFavorites(userId, page);
        if (favorite !== null) {
            res.status(200).json({ status: "success", data: { favorite }, message: "Favorites found" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No favorites found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
