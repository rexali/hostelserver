import Room from "../models/room.model";

export const getFeaturedRooms = async function getFeaturedRooms() {
    let featuredRooms = await Room.findAll({ where: { featured: true }, limit: 2 });

    return featuredRooms;
}