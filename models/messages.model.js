import {Model, DataTypes} from 'sequelize';
import {DatabaseConfig} from '../config/database.js';

export class MessageModel extends Model {}

MessageModel.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    senderId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
          },    
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      chatRoomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'chat_room',
          key: 'id',
        },
      },
},  {
    sequelize: DatabaseConfig,
    tableName: 'messages',
    timestamps: true,
}

);

