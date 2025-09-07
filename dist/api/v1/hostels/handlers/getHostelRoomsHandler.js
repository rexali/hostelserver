"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostelRoomsHandler = getHostelRoomsHandler;
const hostel_controller_1 = require("../controllers/hostel.controller");
async function getHostelRoomsHandler(req, res, next) {
    try {
        const { id } = req.params;
        const { page } = req.query;
        const hotel = await hostel_controller_1.HostelService.getHostelRooms(id, page);
        if (hotel !== null) {
            res.status(200).json({ status: "success", data: { hotel }, message: "Hotel's room collected" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No rooms found for the hotel" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
