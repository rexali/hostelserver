"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewlyAddedRooms = void 0;
const room_controller_1 = require("../controllers/room.controller");
const getNewlyAddedRooms = async function getNewlyAddedRooms() {
    let newRooms = await room_controller_1.RoomService.getRooms();
    newRooms.reverse();
    return newRooms;
};
exports.getNewlyAddedRooms = getNewlyAddedRooms;
