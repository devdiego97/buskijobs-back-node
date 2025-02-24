import { sequelizeConnection } from "../config/sequelize.config";
import sequelize, { DataTypes, Model } from "sequelize";


interface UserInterface extends Model{
    id:number,
    name:string,
    lastname:string,
    email:string,
    password:string,
    type:string | 'candidato' | 'recrutador',
    tel:string,
    photo:string,
    


}


export const usersModel =sequelizeConnection.define<UserInterface>('users',
  {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
    
    },
    lastname:{
        type:DataTypes.STRING,

       
    },
    email:{
        type:DataTypes.STRING,   
    },
    password:{
        type:DataTypes.STRING,
         
    },
    type:{
        type:DataTypes.STRING,
      
    },
    tel:{
        type:DataTypes.STRING,
       
    },
    photo:{
        type:DataTypes.STRING,
        allowNull:true
    }
  },
    
       { tableName: 'users',
        timestamps:false}
    
    



)