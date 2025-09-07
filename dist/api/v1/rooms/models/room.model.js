"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../../../../config");
const booking_model_1 = __importDefault(require("../../bookings/models/booking.model"));
class Room extends sequelize_1.Model {
}
// define model
Room.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    roomNumber: {
        type: sequelize_1.DataTypes.INTEGER
    },
    roomType: {
        type: sequelize_1.DataTypes.STRING
    },
    type: {
        type: sequelize_1.DataTypes.STRING
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER
    },
    location: {
        type: sequelize_1.DataTypes.STRING
    },
    bedrooms: {
        type: sequelize_1.DataTypes.INTEGER
    },
    bathrooms: {
        type: sequelize_1.DataTypes.INTEGER
    },
    capacity: {
        type: sequelize_1.DataTypes.INTEGER
    },
    amenities: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING)
    },
    photos: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING)
    },
    description: {
        type: sequelize_1.DataTypes.TEXT
    },
    availability: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    rating: {
        type: sequelize_1.DataTypes.FLOAT
    },
    featured: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    popular: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    newlyAdded: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    recentlySold: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    recommended: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    agentName: {
        type: sequelize_1.DataTypes.STRING
    },
    agentPhone: {
        type: sequelize_1.DataTypes.STRING
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, { sequelize: config_1.sequelize, tableName: "Room" });
Room.hasMany(booking_model_1.default);
booking_model_1.default.belongsTo(Room);
exports.default = Room;
