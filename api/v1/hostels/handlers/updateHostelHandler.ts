import { HostelService } from "../controllers/hostel.controller"
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { uploadFiles } from "../../../../utils/uploadFile";
import { filterFilesByName } from "../utils/filterFilesByName";
import Hostel from "../models/hostel.model";


export async function updateHostelHandler(req: Request, res: Response, next: NextFunction) {
    uploadFiles()(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            throw new Error(err.message)
        } else if (err) {
            // An unknown error occurred when uploading.
            throw new Error(err)
        };
        // Everything went fine, send the file name and other fields to database
        try {
            let photo, document;
            if (req.files?.length) {  // loop thru the file and add
                photo = filterFilesByName(req.files, 'photo');
                document = filterFilesByName(req.files, 'document');
                // if (req.files?.length==1) {
                //     req.files.map((file:any)=>file.name==='photo')
                // }
            } else {
                let hostel = await Hostel.findByPk(req.body?.hostelId);
                photo = hostel?.photo;
                document = hostel?.document;
            }
            const data = {
                ...req.body,
                photo,
                document
            }
            const { id } = req.params as unknown as { id: number }
            const hotelService = new HostelService(id, data);
            const [affectedCount] = await hotelService.updateHostel() as [affectedCount: number];
            if (affectedCount === 1) {
                res.status(200).json({ status: "success", data: { affectedCount }, message: "Hostel updated" })
            } else {
                res.status(400).json({ status: "fail", data: null, message: "Hostel not updated" })
            }

        } catch (error: any) {
            res.status(500).json({ status: "fail", data: null, message: "Error: " + error.message })
        }
    });

} 