import { Op } from "sequelize";
import Room from "../models/room.model";
import Booking from "../../bookings/models/booking.model";

export const getRecentlyBookedRooms = async function getRecentlySoldRooms() {
    try {
        const recentlyBookedRooms = await Booking.findAll({
            where: {
                createdAt: {
                    [Op.gte]: new Date(new Date() as any - 24 * 60 * 60 * 1000)
                }
            },
            include:{
                model:Room,
                as:'rooms'
            },
            limit:4
        });

        return recentlyBookedRooms;

    } catch (error) {
        console.warn(error);
    }
}