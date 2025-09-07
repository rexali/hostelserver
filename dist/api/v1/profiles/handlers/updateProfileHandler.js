"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileHandler = updateProfileHandler;
const profile_controller_1 = require("../controllers/profile.controller");
const multer_1 = __importDefault(require("multer"));
const uploadFile_1 = require("../../../../utils/uploadFile");
async function updateProfileHandler(req, res, next) {
    (0, uploadFile_1.uploadFile)('image')(req, res, async function (err) {
        if (err instanceof multer_1.default.MulterError) {
            // A Multer error occurred when uploading.
            throw new Error(err.message);
        }
        else if (err) {
            // An unknown error occurred when uploading.
            throw new Error(err);
        }
        ;
        // Everything went fine, send the file name and other fields to database
        try {
            if (req.file?.filename) {
                const id = req.params.id;
                const data = req.body;
                const profileService = new profile_controller_1.ProfileService({ ...data, image: req.file.filename });
                const [affectedCount] = await profileService.updateProfile();
                if (affectedCount === 1) {
                    res.status(200).json({ status: "success", data: { affectedCount }, message: "Profile updated" });
                }
                else {
                    res.status(200).json({ status: "success", data: null, message: "Profile not updated" });
                }
            }
        }
        catch (error) {
            res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
        }
    });
}
