import { RoomService } from "../controllers/room.controller"
import { NextFunction, Request, Response } from "express";
import { uploadMultipleFiles } from "../../../../utils/uploadFile";
import multer from "multer";
import { getFilesNames } from "../utils/getFileNames";


export function createRoomHandler(req: Request, res: Response, next: NextFunction) {

    uploadMultipleFiles('photos')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            throw new Error(err.message)
        } else if (err) {
            // An unknown error occurred when uploading.
            throw new Error(err)
        };
        // Everything went fine, send the file name and other fields to database
        try {

            const files = req.files as any;
            const filenames = getFilesNames(files);
            const photos = filenames;
            const { _csrf, amenities, ...newData } = req.body;
            const _amenities = amenities.split(',').map((item: any) => item.replace(/'/g, ''));
            console.log(_amenities);
            const roomService = new RoomService({ ...newData, photos, amenities: _amenities });
            const room = await roomService.createRoom();
            if (room !== null) {
                res.status(200).json({ status: "success", data: { room }, message: "Room created" })
            } else {
                res.status(200).json({ status: "success", data: null, message: "No room created" })
            }
        } catch (error) {
            res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
        }
    });

}