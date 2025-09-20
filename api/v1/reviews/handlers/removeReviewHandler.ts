
import { ReviewController } from "../controllers/review.controller"
import { NextFunction, Request, Response } from "express";


export async function removeReviewHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params as unknown as {id:number};
        const review = await ReviewController.removeReview(id);
        if (review !== null || undefined) {
            res.status(200).json({ status: "success", data: { review }, review: "Review removed " })
        } else {
            res.status(404).json({ status: "fail", data: null, review: "No review deleted" })
        }
    } catch (error) {
        res.status(500).json({ status: "fail", data: null, review: "Error: " + error })
    }

}