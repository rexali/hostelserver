"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostelHandler = getHostelHandler;
const hostel_controller_1 = require("../controllers/hostel.controller");
async function getHostelHandler(req, res, next) {
    try {
        const { id } = req.params;
        const hostel = await hostel_controller_1.HostelService.getHostel(id);
        if (hostel !== null) {
            res.status(200).json({ status: "success", data: { hostel }, message: "Hostel found" });
        }
        else {
            res.status(200).json({ status: "fail", data: null, message: "No hotsel found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error.message });
    }
}
