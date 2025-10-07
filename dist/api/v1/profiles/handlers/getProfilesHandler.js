"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfilesHandler = getProfilesHandler;
const profile_controller_1 = require("../controllers/profile.controller");
const profile_model_1 = __importDefault(require("../models/profile.model"));
async function getProfilesHandler(req, res, next) {
    try {
        const { page } = req.query;
        const profiles = await profile_controller_1.ProfileService.getProfiles(page);
        const profileCount = await profile_model_1.default.count({ col: "id" });
        if (profiles !== null) {
            res.status(200).json({ status: "success", data: { profiles, profileCount }, message: "Profile found" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No profile(s) found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
