import {Model, DataTypes} from 'sequelize';
import {DatabaseConfig} from '../config/database.js';

export class MainModel extends Model {}

MainModel.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
    },
    fullname:{
        type: DataTypes.STRING (100),
        allowNull: true,
    },
    urlimg:{
        type: DataTypes.STRING (500),
        allowNull: true,
    },
    title:{
        type: DataTypes.STRING (100),
        allowNull: true,
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true
    }
},  {
    sequelize: DatabaseConfig,
    tableName: 'main',
    timestamps: false
}

);