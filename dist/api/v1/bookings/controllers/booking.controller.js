"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const user_model_1 = __importDefault(require("../../auth/models/user.model"));
const constants_1 = require("../../../../constants/constants");
const hostel_model_1 = __importDefault(require("../../hostels/models/hostel.model"));
const room_model_1 = __importDefault(require("../../rooms/models/room.model"));
const booking_model_1 = __importDefault(require("../models/booking.model"));
class BookingService {
    constructor(data) {
        this.data = data;
    }
    ;
    async createBooking() {
        try {
            return await booking_model_1.default.create({
                ...this.data,
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    async updateBooking() {
        try {
            return await booking_model_1.default.update({ ...this.data }, { where: { id: this.data.id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async removeBooking(id) {
        try {
            return await booking_model_1.default.destroy({ where: { id: id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async getBookings(page = 1) {
        try {
            const offset = (page - 1) * constants_1.limit;
            return await booking_model_1.default.findAll({
                offset,
                limit: constants_1.limit,
                include: [
                    {
                        model: room_model_1.default,
                        required: false,
                    },
                    {
                        model: user_model_1.default,
                        required: false,
                    }
                ]
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async getUserBookings(userId, page = 1) {
        try {
            const offset = (page - 1) * constants_1.limit;
            return await booking_model_1.default.findAll({
                offset,
                limit: constants_1.limit,
                where: {
                    UserId: userId
                },
                include: [{
                        model: user_model_1.default,
                        attributes: ["id", "username"],
                        required: false
                    },
                    {
                        model: room_model_1.default,
                        required: false,
                        include: [
                            {
                                model: hostel_model_1.default,
                                required: false,
                                include: [
                                    {
                                        model: user_model_1.default,
                                        attributes: ["id", "username"],
                                    }
                                ]
                            },
                        ]
                    }
                ]
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async getVendorBookings(userId, page = 1) {
        try {
            const offset = (page - 1) * constants_1.limit;
            return await booking_model_1.default.findAll({
                offset,
                limit: constants_1.limit,
                include: [{
                        model: user_model_1.default,
                        attributes: ["id", "username"],
                        required: false
                    },
                    {
                        model: room_model_1.default,
                        required: false,
                        include: [
                            {
                                model: hostel_model_1.default,
                                required: false,
                                where: {
                                    UserId: userId
                                },
                                include: [
                                    {
                                        model: user_model_1.default,
                                        attributes: ["id", "username"],
                                        where: {
                                            id: userId
                                        },
                                    }
                                ]
                            },
                        ]
                    }
                ]
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async getBooking(id) {
        try {
            return await booking_model_1.default.findOne({ where: { id: id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async cancelBooking(id) {
        try {
            return await booking_model_1.default.update({ status: "canceled" }, { where: { id: id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
}
exports.BookingService = BookingService;
