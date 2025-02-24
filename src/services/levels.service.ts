import { where } from "sequelize"
import { curriculumModel } from "../Models/curriculum.model"
import { jobsModel } from "../Models/jobs.model"
import { ILevel, levelsModel } from "../Models/levels.model"






export const LevelsService={
 

    listAllLevels:async():Promise<ILevel[] | [] | object>=>{
        try{
            const levelsList=await levelsModel.findAll({
                include:[{model:jobsModel,as:'jobs'},{model:curriculumModel,as:'curriculuns'}]}
           )
             return levelsList
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    },
   
    getLevelById:async(id:number):Promise<ILevel | object>=>{
        try{
            const levelId=await levelsModel.findByPk(id,{
                include:[
                    {model:jobsModel,as:'jobs'},
                    {model:curriculumModel,as:'curriculuns'}
                ]
            })
            if(levelId){
                return levelId
            }else{
                return {'message':"nivel profissional não encontrado"}
            }
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    },
    addNewLevel:async(name:string)=>{
        try{
            let newLevel=await levelsModel.create({name})
            return newLevel
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    },
    deleteLevelById:async(id:number):Promise<object>=>{
        try{
           await levelsModel.destroy({where:{id}})
           return {'message':'nivel profissional deletado'}
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    }
   


}