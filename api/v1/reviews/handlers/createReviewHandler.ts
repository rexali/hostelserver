
import { ReviewController } from "../controllers/review.controller"
import { NextFunction, Request, Response } from "express";
import { Review as ReviewType } from "../types/types";

export async function createReviewHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body as ReviewType;
        const reviewController = new ReviewController(data);
        const review = await reviewController.createReview() as unknown as ReviewType;
        if (review !== null || undefined) {
            res.status(200).json({ status: "success", data: { review }, review: "Review created" })
        } else {
            res.status(400).json({ status: "fail", data: null, review: "No review sent" })
        }
    } catch (error) {
        res.status(500).json({ status: "fail", data: null, review: "Error: " + error })
    }
}