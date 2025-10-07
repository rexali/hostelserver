"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFavouritesHandler = getUserFavouritesHandler;
const favourite_controller_1 = require("../controllers/favourite.controller");
const favorite_model_1 = __importDefault(require("../models/favorite.model"));
async function getUserFavouritesHandler(req, res, next) {
    try {
        const { id } = req.params;
        const { page } = req.query;
        const roomCount = await favorite_model_1.default.count({ col: "id" });
        const favourites = await favourite_controller_1.FavoriteService.getUserFavorites(id, page);
        if (favourites !== null) {
            res.status(200).json({ status: "success", data: { favourites, roomCount }, message: "Favourites found" });
        }
        else {
            res.status(400).json({ status: "fail", data: null, message: "No favourites found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error.message });
    }
}
