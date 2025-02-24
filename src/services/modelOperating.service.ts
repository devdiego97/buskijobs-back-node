import { jobsModel } from "../Models/jobs.model"
import { IModelOperating, modelOperatingModel } from "../Models/modelOperating.model"




export const ModelOperatingService={
 

    listAllModelOperating:async():Promise<IModelOperating[] | [] | object>=>{
        try{
              const modelsOperatingList=await modelOperatingModel.findAll({
                 include:[{model:jobsModel,as:'jobs'}]
               })
              return modelsOperatingList
        }catch(e){
            console.log(e)
            return ({'error':'algo deu errado.consulte o console'})
        } 
    },
    getModelOperatingId:async(id:number):Promise<IModelOperating | object>=>{
        try{
            const modelOperatingId=await modelOperatingModel.findByPk(id,{include:{model:jobsModel,as:'jobs'}})
            if(modelOperatingId){
                return modelOperatingId
            }else{
                return {message:'modelo de atuação não existe'}
            }
        
        }catch(e){
            console.log(e)
            return ({'error':'algo deu errado.consulte o console'})
           
        } 
    },
    createModelOperating:async(name:string):Promise<IModelOperating | object>=>{
            try{
                let newModel=await modelOperatingModel.create({name})
                return newModel
             }catch(e){
                console.log(e)
                return ({'error':'algo deu errado.consulte o console'})
               
            } 
        },
   deleteModelOperatingId:async(id:number):Promise<Object>=>{
            try{
               await modelOperatingModel.destroy({where:{id}})
               return {'message':'modelo de atuaçao deletado'}
             }catch(e){
                console.log(e)
                return ({'error':'algo deu errado.consulte o console'})
               
            } 
        }
   


}