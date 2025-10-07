"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoomHandler = createRoomHandler;
const room_controller_1 = require("../controllers/room.controller");
const uploadFile_1 = require("../../../../utils/uploadFile");
const multer_1 = __importDefault(require("multer"));
const getFileNames_1 = require("../utils/getFileNames");
function createRoomHandler(req, res, next) {
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
            const files = req.files;
            const filenames = (0, getFileNames_1.getFilesNames)(files);
            const photos = filenames;
            const { _csrf, amenities, ...newData } = req.body;
            const _amenities = amenities.split(',').map((item) => item.replace(/'/g, ''));
            console.log(_amenities);
            const roomService = new room_controller_1.RoomService({ ...newData, photos, amenities: _amenities });
            const room = await roomService.createRoom();
            if (room !== null) {
                res.status(200).json({ status: "success", data: { room }, message: "Room created" });
            }
            else {
                res.status(200).json({ status: "success", data: null, message: "No room created" });
            }
        }
        catch (error) {
            res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
        }
    });
}
