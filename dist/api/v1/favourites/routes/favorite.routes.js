"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createFavoriteHandler_1 = require("../handlers/createFavoriteHandler");
const removeFavoriteHandler_1 = require("../handlers/removeFavoriteHandler");
const clearFavoritesHandler_1 = require("../handlers/clearFavoritesHandler");
const getAllFavouritesHandler_1 = require("../handlers/getAllFavouritesHandler");
const getUserFavouritesHandler_1 = require("../handlers/getUserFavouritesHandler");
const favoriteRouter = express_1.default.Router();
favoriteRouter.post("/", createFavoriteHandler_1.createFavoriteHandler);
favoriteRouter.delete("/:roomId/:userId", removeFavoriteHandler_1.removeFavoriteHandler);
favoriteRouter.get("/:id", getUserFavouritesHandler_1.getUserFavouritesHandler);
favoriteRouter.get("/", getAllFavouritesHandler_1.getAllFavouritesHandler);
favoriteRouter.delete("/:userId", clearFavoritesHandler_1.clearFavoriteHandler);
exports.default = favoriteRouter;
