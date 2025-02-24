import { sequelizeConnection } from "../config/sequelize.config";
import { DataTypes, Model } from "sequelize";
import { applicationsModel } from "./applications.model";
import { curriculumModel } from "./curriculum.model";
import { usersModel } from "./users.model";


export interface IMessage extends Model{
    id:number,
    idcandidate:number,
    idrecruiter:number,
    idapplication:number,
    date:Date,
    message:string,
    subject:string
    
}


export const messagesModel=sequelizeConnection.define<IMessage>('applicationsModel',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    idrecruiter:{
        type:DataTypes.INTEGER
    },
    idcandidate:{
        type:DataTypes.INTEGER,
    
    },
    idapplication:{
        type:DataTypes.INTEGER,
    },
    date:{
        type:DataTypes.DATE,
    },
    message:{
        type:DataTypes.STRING,
    },
    subject:{
        type:DataTypes.STRING
    }
    
},{
    tableName:'messages',
    timestamps:false
})


messagesModel.belongsTo(applicationsModel,{foreignKey:'idapplication',as:"application"})
applicationsModel.hasMany(messagesModel,{foreignKey:'idapplication',as:"messages"})
messagesModel.belongsTo(usersModel,{foreignKey:'idcandidate',as:'candidate'})
messagesModel.belongsTo(usersModel,{foreignKey:'idrecruiter',as:'recruiter'})