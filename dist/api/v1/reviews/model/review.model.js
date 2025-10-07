"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../../../../config");
class Review extends sequelize_1.Model {
}
// define model
Review.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    RoomId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    content: {
        type: sequelize_1.DataTypes.STRING
    },
    UserId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    rating: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0.0
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE
}, { sequelize: config_1.sequelize, tableName: "Review" });
exports.default = Review;
