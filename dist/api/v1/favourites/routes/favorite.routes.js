"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createFavoriteHandler_1 = require("../handlers/createFavoriteHandler");
const removeFavoriteHandler_1 = require("../handlers/removeFavoriteHandler");
const getFavoritesHandler_1 = require("../handlers/getFavoritesHandler");
const clearFavoritesHandler_1 = require("../handlers/clearFavoritesHandler");
const favoriteRouter = express_1.default.Router();
favoriteRouter.post("/", createFavoriteHandler_1.createFavoriteHandler);
favoriteRouter.delete("/:roomId/:userId", removeFavoriteHandler_1.removeFavoriteHandler);
favoriteRouter.get("/:userId", getFavoritesHandler_1.getFavoritesHandler);
favoriteRouter.get("/", getFavoritesHandler_1.getFavoritesHandler);
favoriteRouter.delete("/:userId", clearFavoritesHandler_1.clearFavoriteHandler);
exports.default = favoriteRouter;
