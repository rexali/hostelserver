"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingsHandler = getBookingsHandler;
const booking_controller_1 = require("../controllers/booking.controller");
const booking_model_1 = __importDefault(require("../models/booking.model"));
async function getBookingsHandler(req, res, next) {
    try {
        const { page } = req.query;
        const bookings = await booking_controller_1.BookingService.getBookings(page ?? 1);
        const bookingCount = await booking_model_1.default.count({ col: "id" });
        if (bookings !== null) {
            res.status(200).json({ status: "success", data: { bookings, bookingCount }, message: "Bookings found" });
        }
        else {
            res.status(400).json({ status: "fail", data: null, message: "No booking found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error });
    }
}
