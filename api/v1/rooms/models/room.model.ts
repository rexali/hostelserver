import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model
} from "sequelize";
import { sequelize } from "../../../../config";
import Booking from "../../bookings/models/booking.model";
import Review from "../../reviews/model/review.model";


class Room extends Model<InferAttributes<Room>, InferCreationAttributes<Room>> {
    declare id?: CreationOptional<number>;
    declare name: string;
    declare roomNumber: number;
    declare type: string;
    declare price: number;
    declare location: string;
    declare bedrooms: number;
    declare bathrooms: number;
    declare capacity: number;
    declare amenities: Array<string>;
    declare photos: Array<string>;
    declare description: string;
    declare availability: boolean;
    declare rating: number;
    declare featured: boolean;
    declare agentName: string;
    declare agentPhone: string;
    declare HostelId: ForeignKey<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
// define model
Room.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    roomNumber: {
        type: DataTypes.INTEGER
    },
    
    type: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    location: {
        type: DataTypes.STRING
    },
    bedrooms: {
        type: DataTypes.INTEGER
    },
    bathrooms: {
        type: DataTypes.INTEGER
    },
    capacity: {
        type: DataTypes.INTEGER
    },
    amenities: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    photos: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    description: {
        type: DataTypes.TEXT
    },
    availability: {
        type: DataTypes.BOOLEAN
    },
    rating: {
        type: DataTypes.FLOAT
    },
    featured: {
        type: DataTypes.BOOLEAN
    },
   
    agentName: {
        type: DataTypes.STRING
    },
    agentPhone: {
        type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, { sequelize, tableName: "Room" });

Room.hasMany(Booking);
Booking.belongsTo(Room);

Room.hasMany(Review);
Review.belongsTo(Room)


export default Room;


