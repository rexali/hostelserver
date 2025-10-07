"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentlyBookedRooms = void 0;
const sequelize_1 = require("sequelize");
const booking_model_1 = __importDefault(require("../../bookings/models/booking.model"));
const room_model_1 = __importDefault(require("../models/room.model"));
const getRecentlyBookedRooms = async function getRecentlyBookedRooms() {
    try {
        const recentlyBookedRooms = await booking_model_1.default.findAll({
            attributes: [],
            where: {
                createdAt: {
                    [sequelize_1.Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000)
                }
            },
            include: {
                model: room_model_1.default,
            },
            limit: 2
        });
        return recentlyBookedRooms.reverse();
    }
    catch (error) {
        console.warn(error);
    }
};
exports.getRecentlyBookedRooms = getRecentlyBookedRooms;
