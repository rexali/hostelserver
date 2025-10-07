import express from "express";

import { createFavoriteHandler } from "../handlers/createFavoriteHandler";
import { removeFavoriteHandler } from "../handlers/removeFavoriteHandler";
import { clearFavoriteHandler } from "../handlers/clearFavoritesHandler";
import { getAllFavouritesHandler } from "../handlers/getAllFavouritesHandler";
import { getUserFavouritesHandler } from "../handlers/getUserFavouritesHandler";

const favoriteRouter = express.Router();

favoriteRouter.post("/", createFavoriteHandler); 
favoriteRouter.delete("/:roomId/:userId", removeFavoriteHandler);
favoriteRouter.get("/:id", getUserFavouritesHandler);
favoriteRouter.get("/", getAllFavouritesHandler);
favoriteRouter.delete("/:userId", clearFavoriteHandler);

export default favoriteRouter;