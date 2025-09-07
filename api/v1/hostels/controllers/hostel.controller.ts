import { Op } from "sequelize";
import Room from "../../rooms/models/room.model";
import Hostel from "../models/hostel.model";
import { HostelRoomsBookings, HostelType, Terms } from "../types/types";
import Booking from "../../bookings/models/booking.model";
import User from "../../auth/models/user.model";

export class HostelService {

    id: number;
    data: HostelType;

    constructor(id: number, data: HostelType) {
        this.id = id;
        this.data = data;
    };

    async createHostel() {
        try {
            return await Hostel.create({ ...this.data })
        } catch (error) {
            console.warn(error);
        }
    };

    async updateHostel() {
        try {
            return await Hostel.update({ ...this.data }, { where: { id: this.id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async removeHostel(id: number) {
        try {
            return await Hostel.destroy({ where: { id: id } })
        } catch (error) {
            console.warn(error);
        }
    };

    static async getHostels(page: number = 1) {
        try {
            const offset = (page - 1) * 10;
            return await Hostel.findAll({
                limit: 10,
                offset,
                include: {
                    model: User,
                    attributes: ["id", "username"]
                },

            });
        } catch (error) {
            console.warn(error);
        }
    };

    static async getHostel(id: number) {
        try {
            return await Hostel.findOne({
                where: { id: id },
                include: {
                    model: User,
                    attributes: ["id", "username"]
                }
            })
        } catch (error) {
            console.warn(error);
        }
    };

    static async getHostelRooms(id: number, page: number = 1) {
        try {
            const offset = (page - 1) * 10;
            return await Hostel.findAll({
                limit: 10,
                offset,
                where: { id: id },
                include: [
                    {
                        model: User,
                        attributes: ["id", "username"]
                    },
                    {
                        model: Room,
                    }
                ],

            })
        } catch (error) {
            console.warn(error);
        }
    };

    static async searchHostels(terms: Terms, page: number = 1) {
        const offset = (page - 1) * 10;
        try {
            return await Hostel.findAll({
                limit: 10,
                offset,
                where: {
                    name: {
                        [Op.like]: `${terms.name}%`,
                    },
                    state: {
                        [Op.like]: `${terms.state}%`,
                    }
                },
                include: Room
            });
        } catch (error) {
            console.warn(error);
        }
    };

    static async searchHostelWithTerms(terms: Terms, page: number = 1) {
        try {
            const offset = (page - 1) * 10;
            let hotels: Array<HostelRoomsBookings> = [];
            hotels = await Hostel.findAll({
                limit: 10,
                offset,
                include: {
                    model: Room,
                    include: [
                        {
                            model: Booking,
                            required: false
                        }
                    ],
                    required: false
                }
            }) as unknown as Array<HostelRoomsBookings>;

            if (terms.name) {
                hotels.filter((hotel) => hotel.name === terms.name);
            }
            if (terms.state) {
                hotels.filter(hotel => hotel.name === terms.state);
            }
            if (terms.localGovt) {
                hotels.filter(hotel => hotel.localGovt === terms.localGovt);
            }
            if (terms.checkIn) {
                hotels.filter(hotel => hotel.Rooms.filter(room => room.Bookings.filter(booking => booking.checkIn === terms.checkIn)));
            }
            if (terms.checkOut) {
                hotels.filter(hotel => hotel.Rooms.filter(room => room.Bookings.filter(booking => booking.checkOut === terms.checkOut)));
            }
            return hotels;
        } catch (error) {
            console.warn(error);
        }
    };
}
