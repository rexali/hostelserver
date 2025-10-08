"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoomHandler = updateRoomHandler;
const room_controller_1 = require("../controllers/room.controller");
const multer_1 = __importDefault(require("multer"));
const uploadFile_1 = require("../../../../utils/uploadFile");
const getFileNames_1 = require("../utils/getFileNames");
const room_model_1 = __importDefault(require("../models/room.model"));
async function updateRoomHandler(req, res, next) {
    (0, uploadFile_1.uploadMultipleFiles)('photos')(req, res, async function (err) {
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
            const { id } = req.params;
            const files = req?.files;
            let photos, filenames;
            if (files?.length) {
                filenames = (0, getFileNames_1.getFilesNames)(files);
            }
            else {
                let room = await room_model_1.default.findByPk(id);
                photos = room?.photos;
            }
            const { _csrf, amenities, ...newData } = req.body;
            const _amenities = amenities.split(',').map((item) => item.replace(/'/g, ''));
            const roomService = new room_controller_1.RoomService({ ...newData, photos, amenities: _amenities, id });
            const [affectedCount] = await roomService.editRoom();
            if (affectedCount === 1) {
                res.status(200).json({ status: "success", data: { affectedCount }, message: "Room updated" });
            }
            else {
                res.status(200).json({ status: "success", data: null, message: "No room updated" });
            }
        }
        catch (error) {
            res.status(500).json({ status: "failure", data: null, message: "Error: " + error.message });
        }
    });
}
