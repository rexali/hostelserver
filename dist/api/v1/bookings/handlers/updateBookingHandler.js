"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingHandler = updateBookingHandler;
const booking_controller_1 = require("../controllers/booking.controller");
async function updateBookingHandler(req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        const bookingService = new booking_controller_1.BookingService({ id, ...data });
        const booking = await bookingService.updateBooking();
        if (booking !== null) {
            res.status(200).json({ status: "success", data: { booking }, message: "Booking updated" });
        }
        else {
            res.status(200).json({ status: "fail", data: null, message: "Not updated" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error.message });
    }
}
