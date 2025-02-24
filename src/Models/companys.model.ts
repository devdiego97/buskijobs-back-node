import { sequelizeConnection } from "../config/sequelize.config";
import  { Model,DataTypes } from "sequelize";
import { usersModel } from "./users.model";






export interface ICompany extends Model{
    id:number,
    idcreator:number,
    name:string,
    logo:string | null,
    about:string,
    cnpj:string,
    email:string,
    instagram:string,
    site:string,
    linkedin:string,
    tel:string,
    city:string,
    state:string,
   //galleryImgs:string,
   //bannerImg:string
}

export const companyModel=sequelizeConnection.define<ICompany>('companyModel',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        idcreator:{
            type:DataTypes.INTEGER,
            
        },
        name:{
            type:DataTypes.STRING    
        },
        about:{
            type:DataTypes.TEXT  
        },
        cnpj:{
            type:DataTypes.STRING,
            unique:true 
        },
        tel:{
            type:DataTypes.STRING    
        },
       email:{
            type:DataTypes.STRING,
            unique:true 
        },
        logo:{
            type:DataTypes.BLOB || DataTypes.STRING  
        },
        city:{
            type:DataTypes.STRING    
        },
        state:{
            type:DataTypes.STRING    
        },
        instagram:{
            allowNull:true,
            type:DataTypes.STRING    
        },
        site:{
            allowNull:true,
            type:DataTypes.STRING    
        },
        linkedin:{
            allowNull:true,
            type:DataTypes.STRING    
        }
    },

    
        {tableName:'companys',
        timestamps:false}
    
)
usersModel.hasOne(companyModel,{foreignKey:'idcreator',as:'company'}) // um usuario pode ter uma empresa
companyModel.belongsTo(usersModel,{foreignKey:'idcreator',as:'user'}) //uma companhia pertece a um usuario