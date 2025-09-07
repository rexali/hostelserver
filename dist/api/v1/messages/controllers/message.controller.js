"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const message_model_1 = __importDefault(require("../models/message.model"));
class MessageService {
    constructor(data) {
        this.data = data;
    }
    static async getMessage(id) {
        try {
            return await message_model_1.default.findOne({
                where: {
                    id: id
                }
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    static async getMessages(page = 1) {
        const limit = 10;
        const offset = (page - 1) * limit;
        try {
            return await message_model_1.default.findAll({
                limit,
                offset
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    async createMessage() {
        try {
            return await message_model_1.default.create({ ...this.data });
        }
        catch (error) {
            console.warn(error);
        }
    }
    async updateMessage() {
        try {
            return await message_model_1.default.update({ ...this.data }, { where: { id: this.data.id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
    static async removeMessage(id) {
        try {
            return await message_model_1.default.destroy({ where: { id: id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
}
exports.MessageService = MessageService;
