
interface Filter {
    amenities: Array<string>;
    bathrooms: number;
    name: string;
    location: string,
    minPrice: number;
    maxPrice: number;
    price: Array<number>;
    type: string;
    bedrooms: number;
    availability: boolean;
}
export function getFilteredRooms(filter: Filter, roomData: Array<any>) {

    let rooms = [...roomData];

    if (filter?.name) {
        rooms?.filter(room => room.name === filter?.name)
    }

    if (filter?.availability === true) {
        rooms?.filter(room => room.availability === filter?.availability)
    }

    if (filter?.location) {
        rooms?.filter(room => room.location.toLowerCase() === filter?.location.toLowerCase())
    }

    if (filter?.maxPrice && filter.minPrice >= 0) {
        rooms?.filter(room => room.price >= filter?.minPrice && room.price <= filter?.maxPrice)
    }

    if ((filter?.type)) {
        rooms?.filter(room => room.type === filter?.type);
    }

    if (filter?.bedrooms) {
        rooms?.filter(room => (room.bedrooms === filter?.bedrooms))
    }

    if (filter?.bathrooms) {
        rooms?.filter(room => (room.bedrooms === filter?.bedrooms))
    }

    if (filter?.amenities.length) {
        rooms?.filter(room => filter?.amenities.some(amenity => room.amenities.includes(amenity)))
    }

    return rooms;
}