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
            const { _csrf, ...newData } = req.body;
            const { featured, popular, newlyAdded, recentlySold, recommended, bedrooms, bathrooms, capacity, roomNumber, price, HostelId, rating, amenities, ...rest } = newData;
            // Assign default values after destructuring
            const _availability = Boolean(recentlySold);
            const _featured = Boolean(featured);
            const _popular = Boolean(popular);
            const _newlyAdded = Boolean(newlyAdded);
            const _recentlySold = Boolean(recentlySold);
            const _recommended = Boolean(recommended);
            const _bedrooms = Number(bedrooms);
            const _bathrooms = Number(bathrooms);
            const _capacity = Number(capacity);
            const _roomNumber = Number(roomNumber);
            const _price = Number(price);
            const _HostelId = Number(HostelId);
            const _rating = Number(rating);
            const _amenities = amenities.replace(/^\[|\]$/g, '').split().map((item) => item.replace(/'/g, ''));
            // Optionally, update newData with these defaults if needed
            newData.availability = _availability;
            newData.featured = _featured;
            newData.popular = _popular;
            newData.newlyAdded = _newlyAdded;
            newData.recentlySold = _recentlySold;
            newData.recommended = _recommended;
            newData.bedrooms = _bedrooms;
            newData.bathrooms = _bathrooms;
            newData.capacity = _capacity;
            newData.roomNumber = _roomNumber;
            newData.price = _price;
            newData.HostelId = _HostelId;
            newData.rating = _rating;
            newData.amenities = _amenities;
            const roomService = new room_controller_1.RoomService({ ...newData, photos });
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
