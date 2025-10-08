"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostelsHandler = getHostelsHandler;
const hostel_controller_1 = require("../controllers/hostel.controller");
const hostel_model_1 = __importDefault(require("../models/hostel.model"));
async function getHostelsHandler(req, res, next) {
    try {
        const { page } = req.query;
        const hostels = await hostel_controller_1.HostelService.getHostels(page);
        const hostelCount = await hostel_model_1.default.count({ col: "id" });
        if (hostels !== null) {
            res.status(200).json({ status: "success", data: { hostels, hostelCount }, message: "Hotel found" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No hotel found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
