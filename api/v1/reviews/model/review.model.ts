import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import { sequelize } from "../../../../config";
import User from "../../auth/models/user.model";
import Room from "../../rooms/models/room.model";

class Review extends Model<InferAttributes<Review>, InferCreationAttributes<Review>> {
    declare id: CreationOptional<number>;
    declare RoomId: ForeignKey<number>;
    declare UserId: ForeignKey<number>;
    declare content: string;
    declare rating: number;
    declare updatedAt: CreationOptional<Date>;
    declare createdAt: CreationOptional<Date>;
}
// define model
Review.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    RoomId: {
        type: DataTypes.INTEGER
    },
    content: {
        type: DataTypes.STRING
    },
    UserId: {
        type: DataTypes.INTEGER
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

}, { sequelize, tableName: "Review" });

Review.belongsTo(Room);
Review.belongsTo(User);

export default Review

