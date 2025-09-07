"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProfileHandler = removeProfileHandler;
const profile_controller_1 = require("../controllers/profile.controller");
async function removeProfileHandler(req, res, next) {
    try {
        const { id } = req.params;
        const profile = await profile_controller_1.ProfileService.removeProfile(id);
        if (profile !== null) {
            res.status(200).json({ status: "success", data: { profile }, message: "Profile removed" });
        }
        else {
            res.status(200).json({ status: "success", data: null, message: "No profile removed" });
        }
    }
    catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
    }
}
