import {Model, DataTypes} from 'sequelize';
import {DatabaseConfig} from '../config/database.js';

export class MediaModel extends Model {}

MediaModel.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING (50),
        allowNull: true,
        unique : true
    },
    urlimg:{
        type: DataTypes.STRING (500),
        allowNull: true
    },
    urlsite:{
        type: DataTypes.STRING (500),
        allowNull: true
    }
},  {
    sequelize: DatabaseConfig,
    tableName: 'medias',
    timestamps: false
}

);