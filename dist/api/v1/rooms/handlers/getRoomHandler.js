"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomHandler = getRoomHandler;
const room_controller_1 = require("../controllers/room.controller");
async function getRoomHandler(req, res, next) {
    try {
        const { id } = req.params;
        const rooms = await room_controller_1.RoomService.getRoom(id);
        if (rooms !== null) {
            res.status(200).json({ status: "success", data: { rooms }, message: "Room found" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No room found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
