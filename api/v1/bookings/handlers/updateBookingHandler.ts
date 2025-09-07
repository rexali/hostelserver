import { BookingService } from "../controllers/booking.controller"
import { NextFunction, Request, Response } from "express";
import BookingType from "../types/types";


export async function updateBookingHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = req.params as unknown as any;
        const data = req.body as BookingType;
        const bookingService = new BookingService({id,...data});
        const booking = await bookingService.updateBooking();
        if (booking !== null) {
            res.status(200).json({ status: "success", data: { booking }, message: "Booking updated" })
        } else {
            res.status(200).json({ status: "fail", data: null, message: "Not updated" })
        }
    } catch (error:any) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error.message })
    }

}