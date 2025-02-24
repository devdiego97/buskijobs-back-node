import { sequelizeConnection } from "../config/sequelize.config";
import { DataTypes, Model } from "sequelize";
import { curriculumModel } from "./curriculum.model";


export interface IExperiences extends Model{
    id:number,
    idcurriculum:number,
    companyname:string,
    about:string,
    office:string,
    start:string,
    end:string,
    active:number,
}

export const experiencesModel=sequelizeConnection.define<IExperiences>('experiencesModel',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        idcurriculum:{
            type:DataTypes.INTEGER
        },
       about:{
            type:DataTypes.TEXT
        },
        companyname:{
            type:DataTypes.STRING
        },
        office:{
            type:DataTypes.STRING
        },
        start:{
            type:DataTypes.STRING
        },
        end:{
            type:DataTypes.STRING
        },
        active:{
            type:DataTypes.BIGINT
        },
    },{
        tableName:'experiences',
        timestamps:false

    })


experiencesModel.belongsTo(curriculumModel,{foreignKey:'idcurriculum',as:'experiences'})
curriculumModel.hasMany(experiencesModel,{foreignKey:'idcurriculum',as:'experiences'})