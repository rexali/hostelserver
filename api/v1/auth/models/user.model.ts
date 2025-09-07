import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import {sequelize } from "../../../../config";
import Federation from "./federation.model";
import Hostel from "../../hostels/models/hostel.model";
import Booking from "../../bookings/models/booking.model";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

    declare id: CreationOptional<number>;
    declare username: string;
    declare password: string;
    declare permission: Array<string>;
    declare status: string;
    declare role: string;
    declare code: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>
};

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: { // email
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    },
    permission: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    status: {
        type: DataTypes.ENUM("yes", "no"),
        defaultValue:'no'
    },
    code: {
        type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
},
    {
        sequelize,
        tableName: "User"
    }

);

User.hasMany(Federation);
Federation.belongsTo(User);

User.hasMany(Hostel);
Hostel.belongsTo(User);

User.hasMany(Booking);
Booking.belongsTo(User);

export default User;