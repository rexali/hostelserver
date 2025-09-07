"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const room_model_1 = __importDefault(require("../../rooms/models/room.model"));
const user_model_1 = __importDefault(require("../../auth/models/user.model"));
const config_1 = require("../../../../config");
class Favorite extends sequelize_1.Model {
}
// define model
Favorite.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, { sequelize: config_1.sequelize, tableName: "Favorites" });
Favorite.belongsTo(user_model_1.default);
Favorite.belongsTo(room_model_1.default);
exports.default = Favorite;
