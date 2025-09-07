"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostelsHandler = getHostelsHandler;
const hostel_controller_1 = require("../controllers/hostel.controller");
async function getHostelsHandler(req, res, next) {
    try {
        const { page } = req.query;
        const hotels = await hostel_controller_1.HostelService.getHostels(page);
        if (hotels !== null) {
            res.status(200).json({ status: "success", data: { hotels }, message: "Hotel found" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No hotel found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
