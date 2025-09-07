import express from "express";

import { createHostelHandler } from "../handlers/createHostelHandler";
import { getHostelsHandler } from "../handlers/getHostelsHandler";
import { updateHostelHandler } from "../handlers/updateHostelHandler";
import { getHostelHandler } from "../handlers/getHostelHandler";
import { getHostelRoomsHandler } from "../handlers/getHostelRoomsHandler";
import { searchHostelRoomsBookingHandler } from "../handlers/searchHostelRoomsBooksHandler";
import { removeHostelHandler } from "../handlers/removeHostelHandler";

const hostelRouter = express.Router();

hostelRouter.post("/", createHostelHandler);
hostelRouter.get("/", getHostelsHandler);
hostelRouter.get("/:id", getHostelHandler);
hostelRouter.patch("/:id", updateHostelHandler);
hostelRouter.delete("/:id", removeHostelHandler);
hostelRouter.get("/:id/rooms", getHostelRoomsHandler);
hostelRouter.get("/search", searchHostelRoomsBookingHandler);

export default hostelRouter;