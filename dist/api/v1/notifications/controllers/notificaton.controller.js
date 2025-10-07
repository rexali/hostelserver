"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const constants_1 = require("../../../../constants/constants");
const notification_model_1 = __importDefault(require("../models/notification.model"));
class NotificationService {
    constructor(data) {
        this.data = data;
    }
    static async getNotification(id) {
        try {
            return await notification_model_1.default.findOne({
                where: {
                    id: id
                }
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    static async getNotifications(page = 1) {
        try {
            const offset = (page - 1) * constants_1.limit;
            return await notification_model_1.default.findAll({
                limit: constants_1.limit,
                offset
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    static async getUserNotifications(userId, page = 1) {
        try {
            const offset = (page - 1) * constants_1.limit;
            return await notification_model_1.default.findAll({
                limit: constants_1.limit,
                offset
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    async createNotification() {
        try {
            return await notification_model_1.default.create({ ...this.data });
        }
        catch (error) {
            console.warn(error);
        }
    }
    async updateNotification() {
        try {
            return await notification_model_1.default.update({ ...this.data }, { where: { id: this.data.id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
    static async removeNotification(id) {
        try {
            return await notification_model_1.default.destroy({ where: { id: id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
}
exports.NotificationService = NotificationService;
