"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRoomHandler = removeRoomHandler;
const room_controller_1 = require("../controllers/room.controller");
async function removeRoomHandler(req, res, next) {
    try {
        const { id } = req.params;
        const room = await room_controller_1.RoomService.removeRoom(id);
        if (room !== null) {
            res.status(200).json({ status: "success", data: { room }, message: "Room deleted" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No room deleted" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
