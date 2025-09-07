type BookingType = {
    id?: number,
    checkIn: Date;
    checkOut: Date;
    totalPrice: number;
    status: string;  // confirmed
    paymentStatus: string; // paid
    RoomId: number,
    UserId: number,
    createdAt?: Date,
    updatedAt?: Date
}
export default BookingType;