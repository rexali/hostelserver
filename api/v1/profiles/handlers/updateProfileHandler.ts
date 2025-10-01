import { ProfileService } from "../controllers/profile.controller"
import { NextFunction, Request, Response } from "express";
import { ProfileType } from "../types/types";
import multer from "multer";
import { uploadFile } from "../../../../utils/uploadFile";
import Profile from "../models/profile.model";


export async function updateProfileHandler(req: Request, res: Response, next: NextFunction) {

    uploadFile('image')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            throw new Error(err.message)
        } else if (err) {
            // An unknown error occurred when uploading.
            throw new Error(err)
        };
        // Everything went fine, send the file name and other fields to database
        try {
            const id  = req.params.id as unknown as number ;
            let image;
            if (req.file?.filename) {
                image = req.file?.filename;
            } else {
                let profile = await Profile.findByPk(id);
                image = profile?.image;
            }
            console.log(id);   
            const { _csrf, ...newData } = req.body;

            const profileService = new ProfileService({ ...newData, image, UserId: id });
            const [affectedCount] = await profileService.updateProfile() as [affectedCount: number];
            if (affectedCount === 1) {
                res.status(200).json({ status: "success", data: { affectedCount }, message: "Profile updated" });
            } else {
                res.status(400).json({ status: "fail", data: null, message: "Profile not updated" });
            }


        } catch (error: any) {
            res.status(500).json({ status: "fail", data: null, message: "Error: " + error.message });
        }
    });
} 