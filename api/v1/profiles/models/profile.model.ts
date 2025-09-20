import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import User from "../../auth/models/user.model";
import { sequelize } from "../../../../config";

class Profile extends Model<InferAttributes<Profile>, InferCreationAttributes<Profile>> {
    declare id: CreationOptional<number>;
    declare name: CreationOptional<string>;
    declare image: CreationOptional<string>;
    declare phone: CreationOptional<string>;
    declare dateOfBirth: CreationOptional<Date>;
    declare address: CreationOptional<string>;
    declare localGovt: CreationOptional<string>;
    declare state: CreationOptional<string>;
    declare country: CreationOptional<string>;
    declare UserId: ForeignKey<number | undefined>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}
// define model
Profile.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    dateOfBirth: {
        type: DataTypes.DATE
    },
    address: {
        type: DataTypes.STRING
    },
    localGovt: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, { sequelize, tableName: "Profile" });

Profile.belongsTo(User);

export default Profile;

