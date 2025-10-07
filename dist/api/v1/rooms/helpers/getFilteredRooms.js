"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredRooms = getFilteredRooms;
function getFilteredRooms(filter, roomData) {
    let rooms = [...roomData];
    if (filter?.name) {
        rooms?.filter(room => room.name === filter?.name);
    }
    if (filter?.availability === true) {
        rooms?.filter(room => room.availability === filter?.availability);
    }
    if (filter?.location) {
        rooms?.filter(room => room.location.toLowerCase() === filter?.location.toLowerCase());
    }
    if (filter?.maxPrice && filter.minPrice >= 0) {
        rooms?.filter(room => room.price >= filter?.minPrice && room.price <= filter?.maxPrice);
    }
    if ((filter?.type)) {
        rooms?.filter(room => room.type === filter?.type);
    }
    if (filter?.bedrooms) {
        rooms?.filter(room => (room.bedrooms === filter?.bedrooms));
    }
    if (filter?.bathrooms) {
        rooms?.filter(room => (room.bedrooms === filter?.bedrooms));
    }
    if (filter?.amenities.length) {
        rooms?.filter(room => filter?.amenities.some(amenity => room.amenities.includes(amenity)));
    }
    return rooms;
}
