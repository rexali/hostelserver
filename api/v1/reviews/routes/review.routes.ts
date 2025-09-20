import express from "express";
import { getReviewsHandler } from "../handlers/getReviewsHandler";
import { createReviewHandler } from "../handlers/createReviewHandler";
import { removeReviewHandler } from "../handlers/removeReviewHandler";
import { updateReviewHandler } from "../handlers/updateReviewHandler";

const reviewRouter = express.Router();

reviewRouter.get("/", getReviewsHandler);
reviewRouter.post("/", createReviewHandler);
reviewRouter.delete("/:id", removeReviewHandler);
reviewRouter.patch("/:id", updateReviewHandler);

export default reviewRouter;