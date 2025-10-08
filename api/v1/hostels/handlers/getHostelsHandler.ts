import { HostelService } from "../controllers/hostel.controller"
import { NextFunction, Request, Response } from "express";
import Hostel from "../models/hostel.model";


export async function getHostelsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { page } = req.query as unknown as { page: number };
        const hostels = await HostelService.getHostels(page);
        const hostelCount = await Hostel.count({col:"id"});
        if (hostels !== null) {
            res.status(200).json({ status: "success", data: { hostels, hostelCount }, message: "Hotel found" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No hotel found" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }

}