
import { ReviewController } from "../controllers/review.controller"
import { NextFunction, Request, Response } from "express";

export async function getMessagesHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const page = req.query?.page as unknown as number ?? 1;
        const reviews = await ReviewController.getReviews(page);
        if (reviews !== null || undefined) {
            res.status(200).json({ status: "success", data: { reviews }, message: "Reviews found " })
        } else {
            res.status(404).json({ status: "fail", data: null, message: "No review(s) found" })
        }
    } catch (error) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error })
    }

}