
import { ReviewController } from "../controllers/review.controller"
import { NextFunction, Request, Response } from "express";
import { Review as ReviewType } from "../types/types";


export async function updateReviewHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const id=req.params.id as unknown as number;
        const data = req.body as ReviewType;
        const reviewController = new ReviewController({...data,id});
        const review = await reviewController.updateReview();
        if (review !== null || undefined) {
            res.status(200).json({ status: "success", data: { review }, review: "Review updated" })
        } else {
            res.status(200).json({ status: "fail", data: null, review: "No review update" })
        }
    } catch (error) {
        res.status(500).json({ status: "fail", data: null, review: "Error: " + error })
    }

}