import { RoomService } from "../controllers/room.controller"
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { uploadMultipleFiles } from "../../../../utils/uploadFile";
import { getFilesNames } from "../utils/getFileNames";
import Room from "../models/room.model";


export async function updateRoomHandler(req: Request, res: Response, next: NextFunction) {

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
            const { id } = req.params as unknown as { id: number };
            const files = req?.files as any;
            let photos, filenames;
            if (files.length) {
                filenames = getFilesNames(files);
            } else {
                let room = await Room.findByPk(id);
                photos = room?.photos;
            }
            const { _csrf, images, amenities, ...newData } = req.body;
            const _amenities = amenities.split(',').map((item: any) => item.replace(/'/g, ''));
            const roomService = new RoomService({ ...newData, photos, amenities: _amenities, id });
            const [affectedCount] = await roomService.editRoom() as [affectedCount: number];
            if (affectedCount === 1) {
                res.status(200).json({ status: "success", data: { affectedCount }, message: "Room updated" })
            } else {
                res.status(200).json({ status: "success", data: null, message: "No room updated" })
            }
        } catch (error: any) {
            res.status(500).json({ status: "failure", data: null, message: "Error: " + error.message })
        }
    });


}