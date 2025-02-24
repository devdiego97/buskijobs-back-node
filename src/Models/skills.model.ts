import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../config/sequelize.config";
import { curriculumController } from "../Controllers/curriculums.controller";
import { curriculumModel } from "./curriculum.model";



export interface ISKills extends Model{
    id:number,
    idcurriculum:number,
    name:string
}

export const skillsModel=sequelizeConnection.define<ISKills>('skillsModel',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        idcurriculum:{
            type:DataTypes.INTEGER,
        },
        name:{
            type:DataTypes.STRING
        }
       
    },{
        tableName:'skills',
        timestamps:false
    }
)

curriculumModel.hasMany(skillsModel, { foreignKey: 'idcurriculum', as: 'skills' })
skillsModel.belongsTo(curriculumModel, { foreignKey: 'idcurriculum', as: 'curriculum' })

