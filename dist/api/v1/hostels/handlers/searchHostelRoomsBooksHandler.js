"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchHostelRoomsBookingHandler = searchHostelRoomsBookingHandler;
const hostel_controller_1 = require("../controllers/hostel.controller");
async function searchHostelRoomsBookingHandler(req, res, next) {
    try {
        const terms = req.query;
        const hotelRoomsBooking = await hostel_controller_1.HostelService.searchHostelWithTerms(terms, terms.page);
        if (hotelRoomsBooking !== null) {
            // Remember Me" for 15 minutes: res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
            res.cookie("rememberme", terms, { secure: false, path: "/", expires: new Date(Date.now() + 900000), httpOnly: false });
            res.status(200).json({ status: "success", data: { hotelRoomsBooking }, message: "Hostel and rooms found" });
        }
        else {
            res.status(200).json({ status: "fail", data: null, message: "No hostel and rooms found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
