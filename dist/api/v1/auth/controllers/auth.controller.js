"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
class AuthService {
    constructor(data) {
        this.data = data;
    }
    async createUser() {
        let { password, ...rest } = await user_model_1.default.create({
            ...this.data,
        });
        return rest;
    }
    static async updateUserPassword(data) {
        return await user_model_1.default.update({
            password: data.password
        }, {
            where: { username: data.username }
        });
    }
    static async updateUserCode(data) {
        return await user_model_1.default.update({
            code: data.code
        }, {
            where: { username: data.username }
        });
    }
    static async getUser(data) {
        if (data.username && data.code) {
            return await user_model_1.default.findOne({
                where: {
                    username: data.username, // email
                    code: data.code
                }
            });
        }
        else {
            return await user_model_1.default.findOne({
                where: {
                    username: data.username, // email
                }
            });
        }
    }
    static async getAllUsers(page = 1) {
        const limit = 10;
        const offset = (page - 1) * limit;
        return await user_model_1.default.findAll({
            limit,
            offset,
            attributes: ["id", "username", "role"]
        });
    }
    static async removeUser(id) {
        return await user_model_1.default.destroy({
            where: {
                id: id
            }
        });
    }
}
exports.AuthService = AuthService;
