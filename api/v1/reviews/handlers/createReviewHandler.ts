
import { ReviewController } from "../controllers/review.controller"
import { NextFunction, Request, Response } from "express";
import { Review as ReviewType } from "../types/types";

export async function createReviewHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const data = req.body;
        console.log(data);
        const reviewController = new ReviewController(data);
        const review = await reviewController.createReview();
        if (review !== null || undefined) {
            res.status(200).json({ status: "success", data: { review }, message: "Review created" })
        } else {
            res.status(400).json({ status: "fail", data: null, message: "No review sent" })
        }
    } catch (error) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error })
    }
}