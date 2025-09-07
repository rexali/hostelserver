"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfilesHandler = getProfilesHandler;
const profile_controller_1 = require("../controllers/profile.controller");
async function getProfilesHandler(req, res, next) {
    try {
        const { page } = req.query;
        const profiles = await profile_controller_1.ProfileService.getProfiles(page);
        if (profiles !== null) {
            res.status(200).json({ status: "success", data: { profiles }, message: "Profile found" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No profile(s) found" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
