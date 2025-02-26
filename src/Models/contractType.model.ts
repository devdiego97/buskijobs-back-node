import { sequelizeConnection } from "../config/sequelize.config";
import  { Model,DataTypes } from "sequelize";








export interface IContractType extends Model{
    id:number,
    name:string,

}

export const contractTypeModel=sequelizeConnection.define<IContractType>('contractTypeModel',
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
    
        {tableName:'contracttypes',
        timestamps:false}
    
    
)



