import { HostelService } from "../controllers/hostel.controller"
import { NextFunction, Request, Response } from "express";


export async function removeHostelHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params as unknown as {id:number};
        const hostel = await HostelService.removeHostel(id);
        if (hostel !== null) {
            res.status(200).json({ status: "success", data: { hostel }, message: "Hotel deleted" })
        } else {
            res.status(200).json({ status: "success", data: null, message: "No hostel deleted" })
        }
    } catch (error) {
        res.status(500).json({ status: "failure", data: null, message: "Error: " + error })
    }
}