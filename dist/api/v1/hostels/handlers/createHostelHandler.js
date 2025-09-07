"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHostelHandler = createHostelHandler;
const hostel_controller_1 = require("../controllers/hostel.controller");
const uploadFile_1 = require("../../../../utils/uploadFile");
const multer_1 = __importDefault(require("multer"));
const filterFilesByName_1 = require("../utils/filterFilesByName");
function createHostelHandler(req, res, next) {
    (0, uploadFile_1.uploadFiles)()(req, res, async function (err) {
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
            if (req.files?.length) { // loop thru the file and add
                // const data = req.body as HotelType;
                let photo = (0, filterFilesByName_1.filterFilesByName)(req.files, 'photo');
                let document = (0, filterFilesByName_1.filterFilesByName)(req.files, 'document');
                const data = {
                    ...req.body,
                    photo: photo,
                    document: document
                };
                const hotelService = new hostel_controller_1.HostelService(data.id, data);
                const hotel = await hotelService.createHostel();
                if (hotel !== null) {
                    res.status(200).json({ status: "success", data: { hotel }, message: "Hostel created" });
                }
                else {
                    res.status(200).json({ status: "success", data: null, message: "No hostel created" });
                }
            }
            else {
                console.log(req.files);
            }
        }
        catch (error) {
            res.status(500).json({ status: "failure", data: null, message: "Error: " + error });
        }
    });
}
