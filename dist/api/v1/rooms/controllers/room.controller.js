"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const sequelize_1 = require("sequelize");
const room_model_1 = __importDefault(require("../models/room.model"));
// import Hostel from "../../hotels/models/hotel.model";
const constants_1 = require("../../../../constants/constants");
const hostel_model_1 = __importDefault(require("../../hostels/models/hostel.model"));
class RoomService {
    constructor(data) {
        this.data = data;
    }
    ;
    async createRoom() {
        try {
            return await room_model_1.default.create({ ...this.data });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    async editRoom() {
        try {
            return await room_model_1.default.update({ ...this.data }, { where: { id: this.data.id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async removeRoom(id) {
        try {
            return await room_model_1.default.destroy({ where: { id: id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async getRooms(page = 1) {
        try {
            const offset = (page - 1) * constants_1.limit;
            return await room_model_1.default.findAll({
                limit: constants_1.limit,
                offset,
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async getVendorRooms(userId, page = 1) {
        try {
            const offset = (page - 1) * constants_1.limit;
            return await room_model_1.default.findAll({
                limit: constants_1.limit,
                offset,
                include: {
                    model: hostel_model_1.default,
                    required: false,
                    where: {
                        UserId: userId
                    }
                }
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async getAvailableRooms(page = 1) {
        try {
            const offset = (page - 1) * constants_1.limit;
            return await room_model_1.default.findOne({
                limit: constants_1.limit,
                offset,
                where: {
                    availability: true
                }
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async getRoom(id) {
        try {
            return await room_model_1.default.findOne({ where: { id: id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async searchRooms(term, page) {
        try {
            const offset = (page - 1) * constants_1.limit;
            return await room_model_1.default.findAll({
                limit: constants_1.limit,
                offset,
                where: {
                    roomType: {
                        [sequelize_1.Op.like]: `%${term}%`,
                    },
                },
                include: {
                    model: hostel_model_1.default,
                }
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
}
exports.RoomService = RoomService;
