import { modelOperatingModel } from './../Models/modelOperating.model';
import { Response,Request, response } from "express"
import { jobsModel } from "../Models/jobs.model"
import { ModelOperatingService } from '../services/modelOperating.service';





export const modelOperatingController={
    
    getModelsOperating:async(req:Request,res:Response)=>{
        try{
            const listModels=await ModelOperatingService.listAllModelOperating()
            res.status(200).json(listModels)

        }catch(e){
            res.json('algo deu errado')
            console.log(e)
        }
    },
    getModelOperatingId:async(req:Request,res:Response)=>{
        try{
            const {id}=req.params
            const response=await ModelOperatingService.getModelOperatingId(parseInt(id as string))
        res.status(200).json(response)
        
        }catch(e){
            console.log(e)
            return ({'error':'algo deu errado.consulte o console'})
        }

    },
    addNewModelOperating:async(req:Request,res:Response)=>{
        try{
            const {name}=req.body
            if(name){
                 const response=await ModelOperatingService.createModelOperating(name)
                res.status(200).json(response)

            }else{
                return ({'error':'o name não pode ser vazio'})
            }
    
         }catch(e){
            console.log(e)
             return ({'error':'algo deu errado.consulte o console'})
         } 
    },
    deleteModelOperatingId:async(req:Request,res:Response)=>{
        try{
            const {id}=req.params
           const response=await ModelOperatingService.deleteModelOperatingId(parseInt(id))
            res.status(200).json(response)
         }catch(e){
           console.log(e)
           return ({'error':'algo deu errado.consulte o console'})
         } 
    }
  

}