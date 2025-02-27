import { Request,Response } from "express"
import { experiencesModel } from "../Models/experiences.model"
import { schemaExperience, schemaExperienceUpdate } from "../schemas/experience"
import { ExperienceService } from "../services/experience.service"




export const experinceController ={
   
    getAllExperiences:async(req:Request,res:Response)=>{
        try{
             const experiences=await ExperienceService.listAllExperiences()
             res.status(200).json(experiences)
         }catch(e){
             console.log(e)
             res.status(500).json({error:'erro na requisição.colulte os logs'})
         }
     
    },
    getAllExperiencesFromCurriculum:async(req:Request,res:Response)=>{
        try{
            const {idcurriculum}=req.params
            const experiences=await ExperienceService.getExperiencesFromCurriculum(parseInt(idcurriculum))
            res.status(200).json({message:'esse curriculo não possui experiencias'})
          
         }catch(e){
            console.log(e)
             res.status(500).json({error:'erro na requisição.colulte os logs'})
         }
     
    },
    getExperiencesById:async(req:Request,res:Response)=>{
        try{
            let {id} = req.params
                let experienceId=await experiencesModel.findOne({
                    where:{id}
                })
                if(experienceId){
                    res.json(experienceId)
                }else{
                    res.json({'message':'experiencia não existe'})
                }
            }catch(e){
                console.log(e)
                res.status(500).json({error:'erro na requisição.colulte os logs'})
            }
    },
    postExperience:async(req:Request,res:Response)=>{
      
        try{
            const data=req.body
            const result=schemaExperience.validate(data)
            if(result.error){
                res.json(result.error.message)
            }else{
                const response=await ExperienceService.createExperience(data)
                res.status(201).json(response)
            }

        }catch(e){
            console.log(e)
             res.status(500).json({error:'erro na requisição.colulte os logs'})
        }
        
    },
     
    updateExperienceById:async(req:Request,res:Response)=>{

        try{
            let {id} = req.params
            const data=req.body
            const result=schemaExperienceUpdate.validate(data)
            if(result.error){
                res.json(result.error.message)
            }else{
                await ExperienceService.putExperienceFromId(data,parseInt(id))
                res.status(200).json('experiencia atualizada')
            }

        }catch(e){
            console.log(e)
             res.status(500).json({error:'erro na requisição.colulte os logs'})
        }
    },
    deleteExperienceById:async(req:Request,res:Response)=>{
        try{
            let {id} = req.params
            let response=await ExperienceService.deleteExperienceFromId(parseInt(id))
            res.status(200).json(response)
           
        }catch(e){
            console.log(e)
            res.status(500).json({error:'erro na requisição.colulte os logs'})
        }
    }

}