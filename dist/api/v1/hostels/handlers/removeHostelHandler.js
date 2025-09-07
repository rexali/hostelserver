"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeHostelHandler = removeHostelHandler;
const hostel_controller_1 = require("../controllers/hostel.controller");
async function removeHostelHandler(req, res, next) {
    try {
        const { id } = req.params;
        const hotel = await hostel_controller_1.HostelService.removeHostel(id);
        if (hotel !== null) {
            res.status(200).json({ status: "success", data: { hotel }, message: "Hotel deleted" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No hotel deleted" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
