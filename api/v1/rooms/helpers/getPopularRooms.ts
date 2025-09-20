import { col, fn, Op, literal, where } from "sequelize";
import Room from "../models/room.model";
import Review from "../../reviews/model/review.model";

export const getPopularRooms = async function getPopularRooms() {
    try {
        let popularRooms = await Room.findAll({
            attributes: {
                include: [
                    [fn("AVG", col("reviews.rating")), "averageRating"],
                    [fn("COUNT", col("reviews.id")), "reviewCount"]
                ]
            },
            include: {
                model: Review,
                as: "reviews",
                attributes: []
            },
            group: ["reviews.RoomId"],
            having: where(fn("AVG", col("reviews.rating")), ">=", 0.5),
            order: [[fn("AVG", col("reviews.rating")), 'DESC']],
            limit:2
        });

        return popularRooms;
    } catch (error) {
        console.warn(error);
    }
}