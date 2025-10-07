"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteService = void 0;
const constants_1 = require("../../../../constants/constants");
const hostel_model_1 = __importDefault(require("../../hostels/models/hostel.model"));
const room_model_1 = __importDefault(require("../../rooms/models/room.model"));
const favorite_model_1 = __importDefault(require("../models/favorite.model"));
class FavoriteService {
    constructor(favorite) {
        this.favorite = favorite;
    }
    static async getFavorites(userId, page = 1) {
        try {
            const offset = (page - 1) * constants_1.limit;
            return await favorite_model_1.default.findAll({
                limit: constants_1.limit,
                offset,
                where: {
                    UserId: userId
                },
                include: [{
                        model: room_model_1.default,
                        required: false,
                        include: [
                            {
                                model: hostel_model_1.default,
                                required: false
                            }
                        ]
                    }]
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    static async getAllFavorites(page = 1) {
        try {
            const offset = (page - 1) * constants_1.limit;
            return await favorite_model_1.default.findAll({
                limit: constants_1.limit,
                offset,
                include: [{
                        model: room_model_1.default,
                        required: false,
                        include: [
                            {
                                model: hostel_model_1.default,
                                required: false
                            }
                        ]
                    }]
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    static async getUserFavorites(userId, page = 1) {
        try {
            const offset = (page - 1) * constants_1.limit;
            return await favorite_model_1.default.findAll({
                limit: constants_1.limit,
                offset,
                where: {
                    UserId: userId
                },
                include: [{
                        model: room_model_1.default,
                        required: false,
                        include: [
                            {
                                model: hostel_model_1.default,
                                required: false
                            }
                        ]
                    }]
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    async createFavorite() {
        try {
            return await favorite_model_1.default.create({ ...this.favorite });
        }
        catch (error) {
            console.warn(error);
        }
    }
    static async removeFavorite(id, UserId) {
        try {
            return await favorite_model_1.default.destroy({ where: { id, UserId } });
        }
        catch (error) {
            console.warn(error);
        }
    }
    static async clearFavorite(UserId) {
        try {
            return await favorite_model_1.default.destroy({ where: { UserId } });
        }
        catch (error) {
            console.warn(error);
        }
    }
}
exports.FavoriteService = FavoriteService;
