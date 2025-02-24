import { sequelizeConnection } from "../config/sequelize.config";
import  { Model,DataTypes } from "sequelize";


export interface ICategory extends Model{
    id:number,
    name:string,

}

export const categoryModel=sequelizeConnection.define<ICategory>('categoryModel',
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
    
        {tableName:'categorys',
        timestamps:false}
    
    
)



