import { sequelizeConnection } from "../config/sequelize.config";
import { DataTypes, Model } from "sequelize";
import { jobsModel } from "./jobs.model";
import { curriculumModel } from "./curriculum.model";


export interface IApplications extends Model{
    id:number,
    idcurriculum:number,
    idjob:number,
    date:string
}


export const applicationsModel=sequelizeConnection.define<IApplications>('applicationsModel',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    idcurriculum:{
        type:DataTypes.INTEGER,
    },
    idjob:{
        type:DataTypes.INTEGER,
    },
    date:{
        type:DataTypes.STRING,
    }
},{
    tableName:'applications',
    timestamps:false
})


curriculumModel.hasMany(applicationsModel, {foreignKey: 'idcurriculum',as: 'applications',});
jobsModel.hasMany(applicationsModel,{foreignKey: 'idjob',as: 'applications',});
applicationsModel.belongsTo(curriculumModel, {foreignKey: 'idcurriculum',as: 'curriculum'});
applicationsModel.belongsTo(jobsModel, {foreignKey: 'idjob',as: 'job'});