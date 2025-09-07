"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFilterHelper = searchFilterHelper;
function searchFilterHelper(terms, hotels) {
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
}
