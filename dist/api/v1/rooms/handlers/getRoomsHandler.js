"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomsHandler = getRoomsHandler;
const room_controller_1 = require("../controllers/room.controller");
async function getRoomsHandler(req, res, next) {
    try {
        const rooms = await room_controller_1.RoomService.getRooms();
        if (rooms !== null) {
            if (rooms?.length) {
                res.status(200).json({ status: "success", data: { rooms }, message: "Room(s) found" });
            }
            else {
                res.status(200).json({ status: "success", data: [], message: "No room found" });
            }
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No room found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
