
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
    agentName: string;
    agentPhone: string;
    HostelId: number;
    createdAt?: Date;
    updatedAt?: Date;
}