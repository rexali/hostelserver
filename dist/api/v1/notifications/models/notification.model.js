"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../../../../config");
class Notification extends sequelize_1.Model {
}
// define model
Notification.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    title: {
        type: sequelize_1.DataTypes.STRING
    },
    message: {
        type: sequelize_1.DataTypes.STRING
    },
    read: {
        type: sequelize_1.DataTypes.BOOLEAN // read
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE
}, { sequelize: config_1.sequelize, tableName: "Notification" });
exports.default = Notification;
