"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../../../../config");
const federation_model_1 = __importDefault(require("./federation.model"));
const hostel_model_1 = __importDefault(require("../../hostels/models/hostel.model"));
const booking_model_1 = __importDefault(require("../../bookings/models/booking.model"));
const review_model_1 = __importDefault(require("../../reviews/model/review.model"));
class User extends sequelize_1.Model {
}
;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    role: {
        type: sequelize_1.DataTypes.STRING
    },
    permission: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        defaultValue: ["read", "write"],
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("yes", "no"),
        defaultValue: 'no'
    },
    code: {
        type: sequelize_1.DataTypes.STRING
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE
}, {
    sequelize: config_1.sequelize,
    tableName: "User"
});
User.hasMany(federation_model_1.default);
federation_model_1.default.belongsTo(User);
User.hasMany(hostel_model_1.default);
hostel_model_1.default.belongsTo(User);
User.hasMany(booking_model_1.default);
booking_model_1.default.belongsTo(User);
User.hasMany(review_model_1.default);
review_model_1.default.belongsTo(User);
exports.default = User;
