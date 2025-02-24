import { Response,Request } from "express"
import { jobsModel } from "../Models/jobs.model"
import { levelsModel } from "../Models/levels.model"
import { curriculumModel } from "../Models/curriculum.model"
import { LevelsService } from "../services/levels.service"



export const LevelsController={
    
    getLevels:async(req:Request,res:Response)=>{
        try{
            const response=await LevelsService.listAllLevels()
            res.status(200).json(response)

        }catch(e){
            res.json('algo deu errado')
            console.log(e)
        }
    },
    getLevelId:async(req:Request,res:Response)=>{
     try{
        const {id}=req.params
        const response=await  LevelsService.getLevelById(parseInt(id))
        res.status(200).json(response)
       
     }catch(e){
        res.json('algo deu errado')
        console.log(e)
     }

    },
   createLevel:async(req:Request,res:Response)=>{
        try{
           const {name}=req.body
           if(name){
             const response=await  LevelsService.addNewLevel(name)
             res.status(200).json(response)
           }else{
             res.status(200).json({error:'campo name não pode ser vazio'})
           }
          
        }catch(e){
           res.json('algo deu errado')
           console.log(e)
        }
   
    },
    deleteLevelId:async(req:Request,res:Response)=>{
        try{
           const {id}=req.params
           const response=await  LevelsService.deleteLevelById(parseInt(id))
           res.status(200).json(response)
          
        }catch(e){
           res.json('algo deu errado')
           console.log(e)
        }
   
       }
  

}
