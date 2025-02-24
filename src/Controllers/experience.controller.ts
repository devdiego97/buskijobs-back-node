import { Request,Response } from "express"
import { experiencesModel } from "../Models/experiences.model"
import z from 'zod'
import { schemaExperience, schemaExperienceUpdate } from "../schemas/experience"

const experienceSchema = z.object({
    idcurriculum: z.string(),
    description:z.string().min(12).trim(),
    office:z.string().min(12).trim(),
    companyname:z.string().min(4).trim(),
    start:z.string().trim(),
    end:z.string().trim(),
    active:z.string().trim(),
    
  });


export const experinceController ={
    getAllExperiences:async(req:Request,res:Response)=>{
        try{
            const experiences=await experiencesModel.findAll()
             res.json(experiences)
         }catch(e){
             res.json(e)
         }
     
    },
    getAllExperiencesFromCurriculum:async(req:Request,res:Response)=>{
        try{
            const {idcurriculum}=req.params
            const experiences=await experiencesModel.findAll(
                {
                    where:{idcurriculum}
                }
            )
            if(experiences){
                res.json(experiences)
            }else{
                res.json({message:'esse curriculo não possui experiencias'})
            }
         }catch(e){
             res.json(e)
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
                res.json(e)
            }
    },
    postExperience:async(req:Request,res:Response)=>{
      
        try{
            const data=req.body
            const result=schemaExperience.validate(data)
            if(result.error){
                res.json(result.error.message)
            }else{
                const newExperience=await experiencesModel.create(data)
                res.json(newExperience)
            }

        }catch(e){
            res.json(e)
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
                await experiencesModel.update(data,{where:{id}})
                res.json('experiencia atualizada')
            }

        }catch(e){
            res.json(e)
        }
    },
    deleteExperienceById:async(req:Request,res:Response)=>{
        try{
            let {id} = req.params
            let experience=await experiencesModel.findOne({where:{id}})
            if(experience){
                await experiencesModel.destroy({where:{id}})
                res.json({'success':'experience deletada'})
            }else{
                res.json({'message':'experience não existe'})
            }
        }catch(e){
        }
    }

}