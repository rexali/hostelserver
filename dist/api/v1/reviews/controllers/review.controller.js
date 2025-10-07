"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const review_model_1 = __importDefault(require("../model/review.model"));
class ReviewController {
    constructor(data) {
        this.data = data;
    }
    static async getReview(id) {
        try {
            return await review_model_1.default.findOne({
                where: {
                    id: id
                }
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    static async getReviews(page = 1) {
        const limit = 10;
        const offset = (page - 1) * limit;
        try {
            return await review_model_1.default.findAll({
                limit,
                offset
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    async createReview() {
        try {
            return await review_model_1.default.create({ ...this.data });
        }
        catch (error) {
            console.warn(error);
        }
    }
    async updateReview() {
        try {
            return await review_model_1.default.update({ ...this.data }, { where: { id: this.data.id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
    static async removeReview(id) {
        try {
            return await review_model_1.default.destroy({ where: { id: id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
}
exports.ReviewController = ReviewController;
