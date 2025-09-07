import { BookingService } from "../controllers/booking.controller"
import { NextFunction, Request, Response } from "express";
import BookingType from "../types/types";
import Room from "../../rooms/models/room.model";
import { RoomType } from "../../rooms/types/types";
import { RoomService } from "../../rooms/controllers/room.controller";

export async function createBookingHandler(req: Request, res: Response, next: NextFunction) {
    try {

        const data = req.body;

        let room = await RoomService.getRoom(data.RoomId as number) as unknown as RoomType;
        // check to see the room is not available
        if (room?.availability) {

            const bookingService = new BookingService({ ...data });

            const booking = await bookingService.createBooking() as unknown as BookingType;

            if (booking !== null) {

                const [affectedCount] = await Room.update(
                    {
                        availability: false

                    }, { where: { id: data.RoomId } }) as unknown as [affectedCount: number];

                res.status(200).json({ status: "success", data: { booking }, message: "Booking created" });

            } else {
                res.status(200).json({ status: "fail", data: { booking }, message: "Booking not created" })
            }

        } else {
            res.status(200).json({ status: "fail", data: null, message: "Room not available" })
        }
    } catch (error:any) {
        res.status(500).json({ status: "fail", data: null, message: "Error: " + error.message })
    }

}