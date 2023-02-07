import {Model, DataTypes} from 'sequelize';
import {DatabaseConfig} from '../config/database.js';
import { MediaModel } from './media.model.js';

export class AboutmeModel extends Model {}

AboutmeModel.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: "null",
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING (50),
        allowNull: true,
    },
    urlimg:{
        type: DataTypes.STRING (500),
        allowNull: true,
    },
    descripcion:{
        type: DataTypes.TEXT,
        allowNull: true
    }
},  {
    sequelize: DatabaseConfig,
    tableName: 'aboutme',
    timestamps: false
}

);

//AboutmeModel.belongsToMany(MediaModel, {as: "medias", through: "aboutme_medias", foreignKey: "aboutme_id"});

// 1aN
// Aboutme va a tener muchas redes sociales
// Se añade una clave aboutmeId a la tabla media
AboutmeModel.hasMany(MediaModel, { as: "medias", foreignKey: "mediaId" });
// Se añade una clave AboutmeId a la tabla Media
MediaModel.belongsTo(AboutmeModel, { as: "media" });