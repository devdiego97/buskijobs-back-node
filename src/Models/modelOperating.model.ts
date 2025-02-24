import { sequelizeConnection } from "../config/sequelize.config";
import sequelize, { Model,DataTypes } from "sequelize";
import { usersModel } from "./users.model";






export interface IModelOperating extends Model{
    id:number,
    name:string,
  

}

export const modelOperatingModel=sequelizeConnection.define<IModelOperating>('modelOperatingModel',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        
        name:{
            type:DataTypes.STRING    
        },
    },
    
        {tableName:'model_operating',
        timestamps:false}
    
    
)
