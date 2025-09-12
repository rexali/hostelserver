"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../../../../config");
class Booking extends sequelize_1.Model {
}
// define model
Booking.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    checkIn: {
        type: sequelize_1.DataTypes.DATE
    },
    checkOut: {
        type: sequelize_1.DataTypes.DATE
    },
    totalPrice: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    paymentStatus: {
        type: sequelize_1.DataTypes.INTEGER
    },
    status: {
        type: sequelize_1.DataTypes.STRING
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE
}, { sequelize: config_1.sequelize, tableName: "Booking" });
exports.default = Booking;
