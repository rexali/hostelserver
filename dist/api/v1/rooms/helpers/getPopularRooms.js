"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPopularRooms = void 0;
const sequelize_1 = require("sequelize");
const room_model_1 = __importDefault(require("../models/room.model"));
const review_model_1 = __importDefault(require("../../reviews/model/review.model"));
const getPopularRooms = async function getPopularRooms() {
    try {
        let popularRooms = await room_model_1.default.findAll({
            attributes: {
                include: [
                    [(0, sequelize_1.fn)("AVG", (0, sequelize_1.col)("Reviews.rating")), "averageRating"],
                    [(0, sequelize_1.fn)("COUNT", (0, sequelize_1.col)("Reviews.id")), "reviewCount"]
                ]
            },
            subQuery: false,
            include: [{
                    model: review_model_1.default,
                    required: false
                }],
            group: ["Room.id", "Reviews.id"],
            having: (0, sequelize_1.where)((0, sequelize_1.fn)("AVG", (0, sequelize_1.col)("Reviews.rating")), ">=", 0.0),
            order: [[(0, sequelize_1.fn)("AVG", (0, sequelize_1.col)("Reviews.rating")), 'DESC']],
            limit: 2
        });
        return popularRooms;
    }
    catch (error) {
        console.warn(error);
    }
};
exports.getPopularRooms = getPopularRooms;
