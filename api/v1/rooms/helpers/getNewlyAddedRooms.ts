import { RoomService } from "../controllers/room.controller";

export const getNewlyAddedRooms = async function getNewlyAddedRooms() {
    let newRooms = await RoomService.getRooms() as any;
    newRooms.reverse();
    return newRooms;
}