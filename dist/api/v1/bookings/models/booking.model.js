"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../../../../config");
class Booking extends sequelize_1.Model {
}
Booking.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // checkIn: {
    //     type: DataTypes.DATE,
    //     defaultValue: DataTypes.NOW
    // },
    // checkOut: {
    //     type: DataTypes.DATE
    // }
    totalPrice: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    paymentStatus: {
        type: sequelize_1.DataTypes.STRING,
        // defaultValue: "pending" // paid
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        // defaultValue: "pending"  //confirmed
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE
}, { sequelize: config_1.sequelize, tableName: "Booking" });
exports.default = Booking;
