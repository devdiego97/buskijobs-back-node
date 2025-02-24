import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../config/sequelize.config";
import { jobsModel } from "./jobs.model";




export interface ILevel extends Model{
    id:number,
    name:string
}

export const levelsModel=sequelizeConnection.define<ILevel>('levelsModel',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING
        }
       
    },{
        tableName:'levels',
        timestamps:false
    }
)


