import { Model,DataTypes} from "sequelize";
import { sequelizeConnection } from "../config/sequelize.config";
import { usersModel } from "./users.model";
import { levelsModel } from "./levels.model";

export interface ICurriculums extends Model{
    id:number,
    iduser:number,
    idlevel:number,
    name:string,
    lastname:string,
    email:string,
    office:string,
    dateNasc:String,
    tel:string,
    city:string,
    state:string,
    pcd:0 | 1,
    linkedin:string | null,
    github:string | null,
    deficiency:string | null,
    about:string
}


export const curriculumModel=sequelizeConnection.define<ICurriculums>('curriculumModel',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    iduser:{
        type:DataTypes.INTEGER,
        
    },
    idlevel:{
        type:DataTypes.INTEGER
    },
    name:{
        type:DataTypes.STRING,
    },
    lastname:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING
    },
    office:{
        type:DataTypes.STRING,
    },
   tel:{
        type:DataTypes.STRING,
    },
    city:{
        type:DataTypes.STRING,
    },
    state:{
        type:DataTypes.STRING,
    },
    dateNasc:{
        type:DataTypes.STRING,
    },
    pcd:{
        type:DataTypes.BIGINT,
        allowNull:true,
        defaultValue:0
    },
    deficiency:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:null
    },
    about:{
        type:DataTypes.TEXT,
    },
    linkedin:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:null
    },
    github:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:null
    },
   
},{
    tableName:'curriculuns',
    timestamps:false
})

usersModel.hasOne(curriculumModel,{foreignKey:'iduser',as:'curriculum'})
curriculumModel.belongsTo(usersModel,{foreignKey:'iduser',as:'user'})
levelsModel.hasMany(curriculumModel, { foreignKey: 'idlevel', as: 'curriculuns' })
curriculumModel.belongsTo(levelsModel,{foreignKey:'idlevel',as:'level'})
