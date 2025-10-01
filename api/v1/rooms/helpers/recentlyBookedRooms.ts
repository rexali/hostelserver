import { Op } from "sequelize";
import Booking from "../../bookings/models/booking.model";
import Room from "../models/room.model";

export const getRecentlyBookedRooms = async function getRecentlyBookedRooms() {
   
     try {
        const recentlyBookedRooms = await Booking.findAll({
            attributes: [],
            where: {
                createdAt: {
                    [Op.gte]: new Date(new Date() as any - 24 * 60 * 60 * 1000)
                }
            },
            include:{
                model:Room,
            },
            limit:2
        });

        return recentlyBookedRooms.reverse();

    } catch (error) {
        console.warn(error);
    }
}