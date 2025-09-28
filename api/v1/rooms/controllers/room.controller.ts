import { col, fn, Op } from "sequelize";
import Room from "../models/room.model";
import { RoomType } from "../types/types";
import { limit } from "../../../../constants/constants";
import Hostel from "../../hostels/models/hostel.model";
import Review from "../../reviews/model/review.model";

export class RoomService {

    data: RoomType;

    constructor(data: RoomType) {
        this.data = data;
    };

    async createRoom() {
        try {
            return await Room.create({ ...this.data })
        } catch (error) {
            console.warn(error);
        }
    };

    async editRoom() {
        try {
            return await Room.update({ ...this.data }, { where: { id: this.data.id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async removeRoom(id: number) {
        try {
            return await Room.destroy({ where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async getRooms(page: number = 1) {
        try {
            const offset = (page - 1) * limit;

            let rooms = await Room.findAll({
                limit:2,
                offset,
                // attributes: {
                //     include:
                //         [
                //             [fn("AVG", col("Review.rating")), "averageRating"],
                //             [fn("COUNT", col("Review.id")), "reviewCount"],
                //         ],
                // },
                include: {
                    model: Review,
                    // as: "Reviews",
                    // attributes: [
                    //      "id",
                    //      "RoomId",
                    //      "content",
                    //      "rating"
                    // ]
                },
                // group: ["Review.RoomId"]
            });

            return rooms;
        } catch (error) {
            console.warn(error);
        }
    };

    static async getVendorRooms(userId: number, page: number = 1) {
        try {
            const offset = (page - 1) * limit
            return await Room.findAll({
                limit,
                offset,
                include: {
                    model: Hostel,
                    required: false,
                    where: {
                        UserId: userId
                    }
                }

            });
        } catch (error) {
            console.warn(error);
        }
    };

    static async getAvailableRooms(page: number = 1) {
        try {
            const offset = (page - 1) * limit
            return await Room.findOne({
                limit,
                offset,
                where: {
                    availability: true
                }
            });
        } catch (error) {
            console.warn(error);
        }
    };

    static async getRoom(id: number) {
        try {
            return await Room.findOne({ where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async searchRooms(term: string, page: number) {
        try {
            const offset = (page - 1) * limit
            return await Room.findAll({
                limit,
                offset,
                where: {
                    roomType: {
                        [Op.like]: `%${term}%`,
                    },
                },
                include: {
                    model: Hostel,
                }
            });
        } catch (error) {
            console.warn(error);
        }
    };
}
