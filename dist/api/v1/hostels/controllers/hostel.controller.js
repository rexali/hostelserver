"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostelService = void 0;
const sequelize_1 = require("sequelize");
const room_model_1 = __importDefault(require("../../rooms/models/room.model"));
const hostel_model_1 = __importDefault(require("../models/hostel.model"));
const booking_model_1 = __importDefault(require("../../bookings/models/booking.model"));
const user_model_1 = __importDefault(require("../../auth/models/user.model"));
class HostelService {
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }
    ;
    async createHostel() {
        try {
            return await hostel_model_1.default.create({ ...this.data });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    async updateHostel() {
        try {
            return await hostel_model_1.default.update({ ...this.data }, { where: { id: this.id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async removeHostel(id) {
        try {
            return await hostel_model_1.default.destroy({ where: { id: id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async getHostels(page = 1) {
        try {
            const offset = (page - 1) * 10;
            return await hostel_model_1.default.findAll({
                limit: 10,
                offset,
                include: {
                    model: user_model_1.default,
                    attributes: ["id", "username"]
                },
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async getHostel(id) {
        try {
            return await hostel_model_1.default.findOne({
                where: { id: id },
                include: {
                    model: user_model_1.default,
                    attributes: ["id", "username"]
                }
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async getHostelRooms(id, page = 1) {
        try {
            const offset = (page - 1) * 10;
            return await hostel_model_1.default.findAll({
                limit: 10,
                offset,
                where: { id: id },
                include: [
                    {
                        model: user_model_1.default,
                        attributes: ["id", "username"]
                    },
                    {
                        model: room_model_1.default,
                    }
                ],
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async searchHostels(terms, page = 1) {
        const offset = (page - 1) * 10;
        try {
            return await hostel_model_1.default.findAll({
                limit: 10,
                offset,
                where: {
                    name: {
                        [sequelize_1.Op.like]: `${terms.name}%`,
                    },
                    state: {
                        [sequelize_1.Op.like]: `${terms.state}%`,
                    }
                },
                include: room_model_1.default
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
    static async searchHostelWithTerms(terms, page = 1) {
        try {
            const offset = (page - 1) * 10;
            let hotels = [];
            hotels = await hostel_model_1.default.findAll({
                limit: 10,
                offset,
                include: {
                    model: room_model_1.default,
                    include: [
                        {
                            model: booking_model_1.default,
                            required: false
                        }
                    ],
                    required: false
                }
            });
            if (terms.name) {
                hotels.filter((hotel) => hotel.name === terms.name);
            }
            if (terms.state) {
                hotels.filter(hotel => hotel.name === terms.state);
            }
            if (terms.localGovt) {
                hotels.filter(hotel => hotel.localGovt === terms.localGovt);
            }
            if (terms.checkIn) {
                hotels.filter(hotel => hotel.Rooms.filter(room => room.Bookings.filter(booking => booking.checkIn === terms.checkIn)));
            }
            if (terms.checkOut) {
                hotels.filter(hotel => hotel.Rooms.filter(room => room.Bookings.filter(booking => booking.checkOut === terms.checkOut)));
            }
            return hotels;
        }
        catch (error) {
            console.warn(error);
        }
    }
    ;
}
exports.HostelService = HostelService;
