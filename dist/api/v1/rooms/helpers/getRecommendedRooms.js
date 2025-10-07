"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendedRooms = void 0;
const sequelize_1 = require("sequelize");
const room_model_1 = __importDefault(require("../models/room.model"));
const getRecommendedRooms = async function getRecommendedRooms(term = 'hamco') {
    try {
        let recommendedRooms = await room_model_1.default.findAll({
            where: {
                name: {
                    [sequelize_1.Op.iLike]: '%' + term + '%'
                }
            },
            limit: 2
        });
        return recommendedRooms;
    }
    catch (error) {
        console.warn(error);
    }
};
exports.getRecommendedRooms = getRecommendedRooms;
