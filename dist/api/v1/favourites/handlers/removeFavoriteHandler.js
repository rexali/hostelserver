"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavoriteHandler = removeFavoriteHandler;
const favourite_controller_1 = require("../controllers/favourite.controller");
async function removeFavoriteHandler(req, res, next) {
    try {
        const { roomId, userId } = req.params;
        const favorite = await favourite_controller_1.FavoriteService.removeFavorite(roomId, userId);
        if (favorite !== null || undefined) {
            res.status(200).json({ status: "success", data: { favorite }, favorite: "Favourite removed " });
        }
        else {
            res.status(200).json({ status: "success", data: null, favorite: "No favourite removed" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, favorite: "Error: " + error });
    }
}
