"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../../../../config");
class Federation extends sequelize_1.Model {
}
Federation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    provider: {
        type: sequelize_1.DataTypes.STRING
    },
    subject: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: config_1.sequelize,
    tableName: "Federation"
});
exports.default = Federation;
