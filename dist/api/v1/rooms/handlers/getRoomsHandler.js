"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomsHandler = getRoomsHandler;
const room_controller_1 = require("../controllers/room.controller");
const getNewlyAddedRooms_1 = require("../helpers/getNewlyAddedRooms");
const getPopularRooms_1 = require("../helpers/getPopularRooms");
const getRecommendedRooms_1 = require("../helpers/getRecommendedRooms");
const recentlyBookedRooms_1 = require("../helpers/recentlyBookedRooms");
const getFeaturedRooms_1 = require("../helpers/getFeaturedRooms");
const room_model_1 = __importDefault(require("../models/room.model"));
async function getRoomsHandler(req, res, next) {
    try {
        const term = req.query?.term;
        const page = req.query?.page;
        const rooms = await room_controller_1.RoomService.getRooms(page);
        const roomCount = await room_model_1.default.count({ col: "id" });
        if (rooms !== null) {
            if (rooms?.length) {
                res.status(200).json({
                    status: "success",
                    data: {
                        roomCount,
                        rooms,
                        newRooms: await (0, getNewlyAddedRooms_1.getNewlyAddedRooms)(),
                        popularRooms: await (0, getPopularRooms_1.getPopularRooms)(),
                        recommendedRooms: await (0, getRecommendedRooms_1.getRecommendedRooms)(term),
                        bookedRooms: await (0, recentlyBookedRooms_1.getRecentlyBookedRooms)(),
                        featuredRooms: await (0, getFeaturedRooms_1.getFeaturedRooms)()
                    },
                    message: "Room(s) found"
                });
            }
            else {
                res.status(404).json({ status: "success", data: [], message: "No room found" });
            }
        }
        else {
            res.status(400).json({ status: "fail", data: null, message: "No room found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error });
    }
}
