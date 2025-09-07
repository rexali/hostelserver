import BookingType from "../../bookings/types/types"
import { RoomType } from "../../rooms/types/types"

export type HostelType = {
    id: number,
    name: string,
    photo: string,
    email: string,
    phone: string,
    address: string,
    description: string,
    localGovt: string,
    state: string,
    country: string,
    document: string,
    UserId: number,
    createdAt?: Date,
    updatedAt?: Date
}

export interface Terms {
    checkIn?: Date, // checkIn
    checkOut?: Date, // checkOut
    name?: string,
    state?: string,
    localGovt?: string,
    page?: number
}

type RoomsBookingsType = RoomType & {
    Bookings: Array<BookingType>
}

export type HostelRoomsBookings = HostelType & {
    Rooms: Array<RoomsBookingsType>;
}