"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createBookingHandler_1 = require("../handlers/createBookingHandler");
const updateBookingHandler_1 = require("../handlers/updateBookingHandler");
const cancelBookingHandler_1 = require("../handlers/cancelBookingHandler");
const getBookingHandler_1 = require("../handlers/getBookingHandler");
const getBookingsHandler_1 = require("../handlers/getBookingsHandler");
const bookingRouter = express_1.default.Router();
bookingRouter.post("/", createBookingHandler_1.createBookingHandler);
bookingRouter.patch("/:id", updateBookingHandler_1.updateBookingHandler);
bookingRouter.put("/:id", cancelBookingHandler_1.cancelBookingHandler);
bookingRouter.get("/:id", getBookingHandler_1.getBookingHandler);
bookingRouter.get("/", getBookingsHandler_1.getBookingsHandler);
exports.default = bookingRouter;
