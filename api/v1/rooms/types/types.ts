
export type RoomType = {
    id?: number;
    name: string;
    roomNumber: number;
    roomType: string;
    type: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    capacity: number;
    amenities: string[];
    photos: string[];
    description: string;
    availability: boolean;
    rating: number;
    featured: boolean;
    popular: boolean;
    newlyAdded: boolean;
    recentlySold: boolean;
    recommended: boolean;
    agentName: string;
    agentPhone: string;
    HostelId: number;
    createdAt?: Date;
    updatedAt?: Date;
}


// export type RoomType = {
//     id?: number;
//     photos: string[];
//     roomNumber: number;
//     roomType: string;
//     availability: boolean;
//     price: number;
//     HotelId: number;
//     createdAt?: Date;
//     updatedAt?: Date;
// }