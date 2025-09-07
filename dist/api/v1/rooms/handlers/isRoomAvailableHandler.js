"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRoomAvailableHandler = isRoomAvailableHandler;
const room_controller_1 = require("../controllers/room.controller");
async function isRoomAvailableHandler(req, res, next) {
    try {
        const { id } = req.params;
        const room = await room_controller_1.RoomService.getRoom(id);
        if (room.availability) {
            res.status(200).json({ status: "success", data: { availibility: room.availability }, message: "Room available" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "Room not available" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
