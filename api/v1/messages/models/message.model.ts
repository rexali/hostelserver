import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import { sequelize} from "../../../../config";

class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
    declare id: CreationOptional<number>;
    declare subject: string;
    declare content: string;
    declare recipientId: number
    declare senderId: number;
    declare read: boolean;
    declare updatedAt: CreationOptional<Date>;
    declare createdAt: CreationOptional<Date>;
}
// define model
Message.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subject: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.STRING
    },
    recipientId: {
        type: DataTypes.INTEGER
    }
    ,
    senderId: {
        type: DataTypes.INTEGER
    },
    read: {
        type: DataTypes.BOOLEAN
    },

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

}, { sequelize, tableName: "Message" });


export default Message

