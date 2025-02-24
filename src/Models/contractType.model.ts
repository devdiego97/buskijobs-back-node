import { sequelizeConnection } from "../config/sequelize.config";
import  { Model,DataTypes } from "sequelize";








export interface IContractTypeModel extends Model{
    id:number,
    name:string,

}

export const contractTypeModel=sequelizeConnection.define<IContractTypeModel>('contractTypeModel',
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



