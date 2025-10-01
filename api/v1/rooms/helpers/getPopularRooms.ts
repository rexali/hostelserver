import { col, fn, Op, literal, where } from "sequelize";
import Room from "../models/room.model";
import Review from "../../reviews/model/review.model";

export const getPopularRooms = async function getPopularRooms() {
    try {
        let popularRooms = await Room.findAll({
            attributes: {
                include: [
                    [fn("AVG", col("Reviews.rating")), "averageRating"],
                    [fn("COUNT", col("Reviews.id")), "reviewCount"]
                ]
            },
            subQuery:false,
            include: [{
                model: Review,
                required:false
            }],
            group: ["Room.id","Reviews.id"],
            having: where(fn("AVG", col("Reviews.rating")), ">=", 0.0),
            order: [[fn("AVG", col("Reviews.rating")), 'DESC']],
            limit:2
        });

        return popularRooms;
    } catch (error) {
        console.warn(error);
    }
}