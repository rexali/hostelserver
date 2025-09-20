export interface Review {
     id?: number;
     RoomId:number;
     UserId: number;
     content: string;
     rating: number;
     updatedAt?: Date;
     createdAt?: Date;
}
