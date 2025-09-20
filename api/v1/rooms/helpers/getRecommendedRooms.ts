import { Op } from "sequelize";
import Room from "../models/room.model";

export const getRecommendedRooms = async function getRecommendedRooms(term: string, location: string, page: number) {
    try {
        let recommendedRooms = await Room.findAll({
            where: {
                name: {
                  [Op.iLike]: term
                }
            },
            limit: 4
        });

        return recommendedRooms;
    } catch (error) {
        console.warn(error);
    }

}