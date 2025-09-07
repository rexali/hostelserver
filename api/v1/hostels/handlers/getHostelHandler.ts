import { HostelService } from "../controllers/hostel.controller"
import { NextFunction, Request, Response } from "express";


export async function getHostelHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params as unknown as { id: number };
        const hotel = await HostelService.getHostel(id);
        if (hotel !== null) {
            res.status(200).json({ status: "success", data: { hotel }, message: "Hostel found" })
        } else { 
            res.status(200).json({ status: "fail", data: null, message: "No hotsel found" })
        }
    } catch (error:any) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error.message })
    }
}