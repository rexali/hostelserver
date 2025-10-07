"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeaturedRooms = void 0;
const room_model_1 = __importDefault(require("../models/room.model"));
const getFeaturedRooms = async function getFeaturedRooms() {
    let featuredRooms = await room_model_1.default.findAll({ where: { featured: true }, limit: 2 });
    return featuredRooms;
};
exports.getFeaturedRooms = getFeaturedRooms;
