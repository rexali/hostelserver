"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewHandler = createReviewHandler;
const review_controller_1 = require("../controllers/review.controller");
async function createReviewHandler(req, res, next) {
    try {
        const data = req.body;
        console.log(data);
        const reviewController = new review_controller_1.ReviewController(data);
        const review = await reviewController.createReview();
        if (review !== null || undefined) {
            res.status(200).json({ status: "success", data: { review }, message: "Review created" });
        }
        else {
            res.status(400).json({ status: "fail", data: null, message: "No review sent" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error });
    }
}
