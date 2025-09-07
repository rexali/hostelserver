"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingsHandler = getBookingsHandler;
const booking_controller_1 = require("../controllers/booking.controller");
async function getBookingsHandler(req, res, next) {
    try {
        const { page } = req.query;
        const booking = await booking_controller_1.BookingService.getBookings(page ?? 1);
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
