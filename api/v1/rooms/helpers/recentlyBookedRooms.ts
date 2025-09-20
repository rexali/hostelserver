import Booking from "../../bookings/models/booking.model";
import Room from "../models/room.model";

export const recentlyBookedRooms = async function newlySoldRooms() {
    const recentlyBookedRooms = await Booking.findAll({
        attributes: [],
        include: {
            model: Room,
            as: "rooms",
            required: false
        }
    });

    return recentlyBookedRooms.reverse();
}