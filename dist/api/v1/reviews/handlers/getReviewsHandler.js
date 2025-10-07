"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsHandler = getReviewsHandler;
const review_controller_1 = require("../controllers/review.controller");
async function getReviewsHandler(req, res, next) {
    try {
        const page = req.query?.page ?? 1;
        const reviews = await review_controller_1.ReviewController.getReviews(page);
        if (reviews !== null || undefined) {
            res.status(200).json({ status: "success", data: { reviews }, message: "Reviews found " });
        }
        else {
            res.status(404).json({ status: "fail", data: null, message: "No review(s) found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error });
    }
}
