"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../../../../config");
class Message extends sequelize_1.Model {
}
// define model
Message.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subject: {
        type: sequelize_1.DataTypes.STRING
    },
    content: {
        type: sequelize_1.DataTypes.STRING
    },
    recipientId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    senderId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    read: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE
}, { sequelize: config_1.sequelize, tableName: "Message" });
exports.default = Message;
