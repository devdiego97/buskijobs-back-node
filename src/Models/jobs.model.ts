import { sequelizeConnection } from "../config/sequelize.config";
import  { Model,DataTypes } from "sequelize";
import { companyModel } from "./companys.model";
import { categoryModel } from "./categorys.model";
import {  levelsModel } from "./levels.model";
import {  modelOperatingModel } from "./modelOperating.model";
import { contractTypeModel,  } from "./contractType.model";

export interface IJobs extends Model{
    id:number,
    companyid:number,
    categoryid:number,
    jobLevelId:number,
    jobContractTypeId:number,
    modelOperatingId:number,
    title:string,
    salary:number,
    description:string,
    benefits:string,
    city:string,
    state:string,
    requirements:string,
    createDate:string,
   expireDate:Date,
    exclusivepcd:number,
    dateSubscriptionMax: Date ,
    status:'ativa' | 'congelada' | 'finalizada'
    //level?:ILevel,
    //contractType?:IContractTypeModel,
    //modelOperatingModel?:IModelOperating

}

export const jobsModel=sequelizeConnection.define<IJobs>('jobsModel',
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        jobLevelId:{
            type:DataTypes.INTEGER,
            
        },
        jobContractTypeId:{
            type:DataTypes.INTEGER,
            
        },
        modelOperatingId:{
            type:DataTypes.INTEGER,
            
        },
        categoryid:{
            type:DataTypes.INTEGER,
            
        },
        title:{
            type:DataTypes.STRING,
               
        },
        salary:{
            type:DataTypes.DECIMAL(10,2)
        },
        description:{
            type:DataTypes.STRING    
        },
        state:{
            type:DataTypes.STRING    
        },
        benefits:{
            type:DataTypes.STRING    
        },
       
       city:{
            type:DataTypes.STRING    
        },
        requirements:{
            type:DataTypes.STRING    
        },
        createDate:{
            type:DataTypes.STRING
        },
       expireDate:{
            type:DataTypes.STRING
        },
        status:{
            type:DataTypes.STRING
        },
        dateSubscriptionMax:{
            type:DataTypes.DATE
        },
        exclusivepcd:{
            type:DataTypes.BOOLEAN
        }
    },
    {
        tableName: "jobs",
        timestamps: true
    }
)
jobsModel.belongsTo(companyModel, { foreignKey: 'companyid',as:'company' }); //um job pertence a uma compnahia
companyModel.hasMany(jobsModel, { foreignKey: 'companyid' ,as:'jobs',}) //uma company pode ter muitos jobs
jobsModel.belongsTo(categoryModel, { foreignKey: 'categoryid',as:'category' }); //um job pertence a uma compnahia
categoryModel.hasMany(jobsModel, { foreignKey: 'categoryid',as:'jobs' }) //uma categoria  pode ter muitos jobs

contractTypeModel.hasMany(jobsModel, { foreignKey: 'jobContractTypeId',as:'jobs' });
jobsModel.belongsTo(contractTypeModel, { foreignKey: 'jobContractTypeId',as:'jobContractType' }) 

levelsModel.hasMany(jobsModel, { foreignKey: 'jobLevelId',as:'jobs' });
jobsModel.belongsTo(levelsModel, { foreignKey: 'jobLevelId',as:'levelJob' }) 

modelOperatingModel.hasMany(jobsModel, { foreignKey: 'modelOperatingId',as:'jobs' }); //um job pertence a uma compnahia
jobsModel.belongsTo(modelOperatingModel, { foreignKey: 'modelOperatingId',as:'modelOperating' }) //uma categoria  pode ter muitos jobs

