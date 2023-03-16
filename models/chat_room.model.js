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
    id_usuario_1: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
    },
    id_usuario_2: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
    },
},  {
    sequelize: DatabaseConfig,
    tableName: 'chat_room',
    timestamps: false,
}

);
