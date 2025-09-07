"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileHandler = getProfileHandler;
const profile_controller_1 = require("../controllers/profile.controller");
async function getProfileHandler(req, res, next) {
    try {
        const { id } = req.params;
        const profile = await profile_controller_1.ProfileService.getProfile(id);
        if (profile !== null) {
            res.status(200).json({ status: "success", data: { profile }, message: "Profile collected" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No profile found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
