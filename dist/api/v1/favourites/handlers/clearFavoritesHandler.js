"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearFavoriteHandler = clearFavoriteHandler;
const favourite_controller_1 = require("../controllers/favourite.controller");
async function clearFavoriteHandler(req, res, next) {
    try {
        const { userId } = req.params;
        const favorite = await favourite_controller_1.FavoriteService.clearFavorite(userId);
        if (favorite !== null || undefined) {
            res.status(200).json({ status: "success", data: { favorite }, favorite: "Favourite cleared" });
        }
        else {
            res.status(200).json({ status: "success", data: null, favorite: "No favourite cleared" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, favorite: "Error: " + error });
    }
}
