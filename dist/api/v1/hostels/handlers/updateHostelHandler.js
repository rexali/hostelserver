"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHostelHandler = updateHostelHandler;
const hostel_controller_1 = require("../controllers/hostel.controller");
const multer_1 = __importDefault(require("multer"));
const uploadFile_1 = require("../../../../utils/uploadFile");
const filterFilesByName_1 = require("../utils/filterFilesByName");
async function updateHostelHandler(req, res, next) {
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
                // const data = req.body as HostelType;
                let photo = (0, filterFilesByName_1.filterFilesByName)(req.files, 'photo');
                let document = (0, filterFilesByName_1.filterFilesByName)(req.files, 'document');
                const data = {
                    ...req.body,
                    photo: photo,
                    document: document
                };
                const { id } = req.params;
                const hotelService = new hostel_controller_1.HostelService(id, data);
                const [affectedCount] = await hotelService.updateHostel();
                if (affectedCount === 1) {
                    res.status(200).json({ status: "success", data: { affectedCount }, message: "Hostel updated" });
                }
                else {
                    res.status(200).json({ status: "success", data: null, message: "Not updated" });
                }
            }
            else {
                console.log(req.files);
            }
        }
        catch (error) {
            res.status(500).json({ status: "failed", data: null, message: "Error: " + error });
        }
    });
}
