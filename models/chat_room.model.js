import {Model, DataTypes} from 'sequelize';
import {DatabaseConfig} from '../config/database.js';
export class ChatRoomModel extends Model {}

ChatRoomModel.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
    },
    chat_name:{
        type: DataTypes.STRING (25),
        allowNull: true,
    },
},  {
    sequelize: DatabaseConfig,
    tableName: 'chat_room',
    timestamps: false,
}

);
