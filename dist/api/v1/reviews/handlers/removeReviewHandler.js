"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeReviewHandler = removeReviewHandler;
const review_controller_1 = require("../controllers/review.controller");
async function removeReviewHandler(req, res, next) {
    try {
        const { id } = req.params;
        const review = await review_controller_1.ReviewController.removeReview(id);
        if (review !== null || undefined) {
            res.status(200).json({ status: "success", data: { review }, review: "Review removed " });
        }
        else {
            res.status(404).json({ status: "fail", data: null, review: "No review deleted" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "fail", data: null, review: "Error: " + error });
    }
}
