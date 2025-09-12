import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model
} from "sequelize";

import { sequelize } from "../../../../config";

class Booking extends Model<InferAttributes<Booking>, InferCreationAttributes<Booking>> {
    declare id: CreationOptional<number>;
    declare checkIn: Date;
    declare checkOut: Date;
    declare totalPrice: number;
    declare status: string;  // confirmed
    declare paymentStatus: string; // paid
    declare RoomId: ForeignKey<number>;
    declare UserId: ForeignKey<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>

}
// define model
Booking.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    checkIn: {
        type: DataTypes.DATE
    },
    checkOut: {
        type: DataTypes.DATE
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    paymentStatus: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, { sequelize, tableName: "Booking" });


export default Booking;

