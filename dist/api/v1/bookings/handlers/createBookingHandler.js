"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingHandler = createBookingHandler;
const booking_controller_1 = require("../controllers/booking.controller");
const room_model_1 = __importDefault(require("../../rooms/models/room.model"));
const room_controller_1 = require("../../rooms/controllers/room.controller");
async function createBookingHandler(req, res, next) {
    try {
        const data = req.body;
        let room = await room_controller_1.RoomService.getRoom(data.RoomId);
        // check to see the room is not available
        if (room?.availability) {
            const bookingService = new booking_controller_1.BookingService({ ...data });
            const booking = await bookingService.createBooking();
            if (booking !== null) {
                const [affectedCount] = await room_model_1.default.update({
                    availability: false
                }, { where: { id: data.RoomId } });
                res.status(200).json({ status: "success", data: { booking }, message: "Booking created" });
            }
            else {
                res.status(200).json({ status: "fail", data: { booking }, message: "Booking not created" });
            }
        }
        else {
            res.status(200).json({ status: "fail", data: null, message: "Room not available" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error.message });
    }
}
