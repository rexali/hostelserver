"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const user_model_1 = __importDefault(require("../../auth/models/user.model"));
const profile_model_1 = __importDefault(require("../../profiles/models/profile.model"));
class AdminService {
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }
    static async getAdminProfile(profileId) {
        try {
            return await profile_model_1.default.findOne({
                where: {
                    id: profileId
                },
                include: {
                    model: user_model_1.default,
                }
            });
        }
        catch (error) {
            console.warn(error);
        }
    }
    async createAdminProfile() {
        try {
            return await profile_model_1.default.create({ ...this.data });
        }
        catch (error) {
            console.warn(error);
        }
    }
    async updateAminProfile() {
        try {
            return await profile_model_1.default.update({ ...this.data }, { where: { id: this.id } });
        }
        catch (error) {
            console.warn(error);
        }
    }
}
exports.AdminService = AdminService;
