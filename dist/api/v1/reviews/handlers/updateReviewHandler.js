"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewHandler = updateReviewHandler;
const review_controller_1 = require("../controllers/review.controller");
async function updateReviewHandler(req, res, next) {
    try {
        const id = req.params.id;
        const data = req.body;
        const reviewController = new review_controller_1.ReviewController({ ...data, id });
        const review = await reviewController.updateReview();
        if (review !== null || undefined) {
            res.status(200).json({ status: "success", data: { review }, review: "Review updated" });
        }
        else {
            res.status(200).json({ status: "fail", data: null, review: "No review update" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "fail", data: null, review: "Error: " + error });
    }
}
