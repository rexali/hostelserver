import { Op } from "sequelize";
import Room from "../models/room.model";

export const getRecommendedRooms = async function getRecommendedRooms(term: string) {
    try {
        let recommendedRooms = await Room.findAll({
            where: {
                name: {
                    [Op.iLike]: '%' + term + '%'
                }
            },
            limit: 2
        });

        return recommendedRooms;
    } catch (error) {
        console.warn(error);
    }

}