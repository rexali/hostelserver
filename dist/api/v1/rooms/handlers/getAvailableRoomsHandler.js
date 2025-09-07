"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableRoomsHandler = getAvailableRoomsHandler;
const room_controller_1 = require("../controllers/room.controller");
async function getAvailableRoomsHandler(req, res, next) {
    try {
        const rooms = await room_controller_1.RoomService.getAvailableRooms();
        if (rooms !== null) {
            res.status(200).json({ status: "success", data: { rooms }, message: "Hotel created" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No hotel created" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
