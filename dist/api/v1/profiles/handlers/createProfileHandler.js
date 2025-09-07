"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfileHandler = createProfileHandler;
const profile_controller_1 = require("../controllers/profile.controller");
const uploadFile_1 = require("../../../../utils/uploadFile");
const multer_1 = __importDefault(require("multer"));
async function createProfileHandler(req, res, next) {
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
                const { id, ...rest } = req.body;
                const profile = await profile_controller_1.ProfileService.createProfile({ ...rest, image: req.file.filename });
                if (profile !== null) {
                    res.status(200).json({ status: "success", data: { profile }, message: "Profile created" });
                }
                else {
                    res.status(200).json({ status: "success", data: null, message: "Profile not created" });
                }
            }
        }
        catch (error) {
            res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
        }
    });
}
