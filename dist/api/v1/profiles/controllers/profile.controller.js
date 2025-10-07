"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const user_model_1 = __importDefault(require("../../auth/models/user.model"));
const constants_1 = require("../../../../constants/constants");
const profile_model_1 = __importDefault(require("../../profiles/models/profile.model"));
class ProfileService {
    constructor(data) {
        // this.id = id;
        this.data = data;
    }
    static async getProfile(id) {
        try {
            return await profile_model_1.default.findOne({
                where: {
                    UserId: id
                },
                include: {
                    model: user_model_1.default,
                    attributes: ["id", "username", "role"]
                }
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    static async getProfiles(page = 1) {
        try {
            const offset = (page - 1) * constants_1.limit;
            return await profile_model_1.default.findAll({
                limit: constants_1.limit,
                offset,
                include: {
                    model: user_model_1.default,
                    attributes: ["id", "username"],
                    required: false
                }
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    static async createProfile(data) {
        try {
            return await profile_model_1.default.create(data);
        }
        catch (error) {
            console.warn(error);
        }
    }
    async updateProfile() {
        try {
            return await profile_model_1.default.update({ ...this.data }, { where: { UserId: this.data.UserId } });
        }
        catch (error) {
            console.warn(error);
        }
    }
    static async removeProfile(id) {
        try {
            return await profile_model_1.default.destroy({ where: { id: id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
}
exports.ProfileService = ProfileService;
