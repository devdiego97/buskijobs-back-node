import { sequelizeConnection } from "../config/sequelize.config";
import { Model,DataTypes } from "sequelize";
import { curriculumModel } from "./curriculum.model";

export interface ITrainning extends Model{
    id:number,
    idcurriculum:number,
    school:string,
    name:string,
    end:string,
    start:string,
    type:string,
    active:number
}

export const trainningsModel = sequelizeConnection.define<ITrainning>('trainningsModel',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    idcurriculum:{
        type:DataTypes.INTEGER,
    },
    school:{
        type:DataTypes.STRING
    },
    name:{
        type:DataTypes.STRING
    },
    end:{
        type:DataTypes.STRING
    },
    start:{
        type:DataTypes.STRING
    },

    type:{
        type:DataTypes.STRING
    },
    active:{
        type:DataTypes.BIGINT
    }

},{
    tableName: 'trainnings',
    timestamps: false
})

trainningsModel.belongsTo(curriculumModel,{foreignKey:'idcurriculum',as:'trainnings'})
curriculumModel.hasMany(trainningsModel,{foreignKey:'idcurriculum',as:'trainnings'})