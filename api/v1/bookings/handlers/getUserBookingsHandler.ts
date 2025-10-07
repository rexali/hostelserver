import { BookingService } from "../controllers/booking.controller"
import { NextFunction, Request, Response } from "express";
import BookingType from "../types/types";
import Booking from "../models/booking.model";


export async function getUserBookingsHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { page } = req.query as unknown as { page: number };
        const userId = req.params.id as unknown as number;
        const bookingCount = await Booking.count({col:"id"});
        const bookings = await BookingService.getUserBookings(userId, page ?? 1);
        if (bookings !== null) {
            res.status(200).json({ status: "success", data: { bookings, bookingCount}, message: "Bookings found" })
        } else {
            res.status(400).json({ status: "fail", data: null, message: "No booking found" })
        }
    } catch (error) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error })
    }

}