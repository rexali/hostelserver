import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../../../../config";

class Notification extends Model<InferAttributes<Notification>, InferCreationAttributes<Notification>> {
    declare id: CreationOptional<number>;
    declare UserId: ForeignKey<number>
    declare title: string;
    declare message: string;
    declare read: boolean;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
// define model
Notification.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserId: {
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING
    },
    message: {
        type: DataTypes.STRING
    },
    read: {
        type: DataTypes.BOOLEAN   // read
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE


}, { sequelize, tableName: "Notification" });


export default Notification


