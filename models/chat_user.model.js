import {Model, DataTypes} from 'sequelize';
import {DatabaseConfig} from '../config/database.js';

import { UserModel } from "./user.model.js";
import { ChatRoomModel } from "./chat_room.model.js";
import { MessageModel } from "./messages.model.js";

export class ChatUserModel extends Model {}

ChatUserModel.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
    },
},  {
    sequelize: DatabaseConfig,
    tableName: 'chat_user',
    timestamps: false,
}

);




ChatRoomModel.belongsToMany(UserModel, {as:"chats", through: "chat_user" });
UserModel.belongsToMany(ChatRoomModel, { through: "chat_user" });
UserModel.hasOne(MessageModel, { as: "sender", foreignKey: "sender_id"})
//ChatUserModel.hasOne(MessageModel, { as: "receiver", foreignKey: "receiver_id"})
ChatRoomModel.hasMany(MessageModel, { as: "messages", foreignKey: "chat_room_id"})