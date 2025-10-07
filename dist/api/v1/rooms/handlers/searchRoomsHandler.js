"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRoomsHandler = searchRoomsHandler;
const room_controller_1 = require("../controllers/room.controller");
const getFilteredRooms_1 = require("../helpers/getFilteredRooms");
async function searchRoomsHandler(req, res, next) {
    try {
        const { page, ...filter } = req.query;
        console.log(filter);
        const result = await room_controller_1.RoomService.getRooms(page ?? 1);
        let rooms = (0, getFilteredRooms_1.getFilteredRooms)(filter, result);
        // console.log(result);
        if (rooms !== null) {
            // Remember Me" for 15 minutes: res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
            res.cookie("rememberme", filter.name, { secure: false, path: "/", expires: new Date(Date.now() + 900000), httpOnly: false });
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
