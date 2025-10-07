import express from "express";
import { createBookingHandler } from "../handlers/createBookingHandler";
import { updateBookingHandler } from "../handlers/updateBookingHandler";
import { cancelBookingHandler } from "../handlers/cancelBookingHandler";
import { getBookingHandler } from "../handlers/getBookingHandler";
import { getBookingsHandler } from "../handlers/getBookingsHandler";
import { getUserBookingsHandler } from "../handlers/getUserBookingsHandler";

const bookingRouter = express.Router();

bookingRouter.post("/", createBookingHandler);
bookingRouter.patch("/:id",updateBookingHandler);
bookingRouter.put("/:id",cancelBookingHandler);
// bookingRouter.get("/:id",getBookingHandler);
bookingRouter.get("/:id",getUserBookingsHandler);
bookingRouter.get("/",getBookingsHandler);

export default bookingRouter;