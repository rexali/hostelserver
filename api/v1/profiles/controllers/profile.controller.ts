import User from "../../auth/models/user.model";
import { limit } from "../../../../constants/constants";
import Profile from "../../profiles/models/profile.model";
import { ProfileType } from "../types/types";

export class ProfileService {

    // private id: number;
    private data: ProfileType;

    constructor(data: ProfileType) {
        // this.id = id;
        this.data = data
    }

    static async getProfile(id: number) {
        try {
            return await Profile.findOne({
                where: {
                    UserId: id
                },
                include: {
                    model: User,
                    attributes:["id","username","role"]
                }
            });
        } catch (error) {
            console.warn(error);
        }

    }

    static async getProfiles(page: number = 1) {
        try {
            const offset = (page-1)*limit;
            return await Profile.findAll({
                limit,
                offset,
                include: {
                    model: User,
                    attributes:["id","username"],
                    required:false
                }
            });
        } catch (error) {
            console.warn(error);
        }

    }

   static async createProfile(data:ProfileType) {
        try {
            return await Profile.create(data);
        } catch (error) {
            console.warn(error);
        }
    }

    async updateProfile() {
        try {
            return await Profile.update({ ...this.data }, { where: { UserId: this.data.UserId } });
        } catch (error) {
            console.warn(error);
        }
    }

    static async removeProfile(id: number) {
        try {
            return await Profile.destroy({ where: { id: id } });
        } catch (error) {
            console.warn(error);
        }
    }
}