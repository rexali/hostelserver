"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingHandler = getBookingHandler;
const booking_controller_1 = require("../controllers/booking.controller");
async function getBookingHandler(req, res, next) {
    try {
        const { id } = req.params;
        const booking = await booking_controller_1.BookingService.getBooking(id);
        if (booking !== null) {
            res.status(200).json({ status: "success", data: { booking }, message: "Booking created" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No booking created" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
