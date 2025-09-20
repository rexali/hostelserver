import Review from "../model/review.model";
import { Review as ReviewType } from "../types/types";

export class ReviewController {

    data: ReviewType;

    constructor(data: ReviewType) {
        this.data = data
    }

    static async getReview(id: number) {
        try {
            return await Review.findOne({
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.warn(error);
        }

    }

    static async getReviews(page: number = 1) {
        const limit = 10;
        const offset = (page - 1) * limit;
        try {
            return await Review.findAll({
                limit,
                offset
            });
        } catch (error) {
            console.warn(error);
        }

    }

    async createReview() {
        try {
            return await Review.create({ ...this.data });
        } catch (error) {
            console.warn(error);
        }
    }

    async updateReview() {
        try {
            return await Review.update({ ...this.data }, { where: { id: this.data.id } });
        } catch (error) {
            console.warn(error);
        }
    }

    static async removeReview(id: number) {
        try {
            return await Review.destroy({ where: { id: id } });
        } catch (error) {
            console.warn(error);
        }
    }
}