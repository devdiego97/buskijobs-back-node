
import { Response,Request } from "express"
import { SkillsService } from "../services/skills.service"


export const SkillsController={

    getSkillsAll:async(req:Request,res:Response)=>{
        try{
            const skillsList=await SkillsService.listAllSkills()
            res.status(200).json(skillsList)

        }catch(e){
            res.json('algo deu errado')
            console.log(e)
        }
    },
    getSkillsFromCurriculum:async(req:Request,res:Response)=>{
        try{
            const {idcurriculum}=req.params
            const skillsList=await SkillsService.listSkillsFromCurriculum(parseInt(idcurriculum))
            res.status(200).json(skillsList)

        }catch(e){
            res.json('algo deu errado')
            console.log(e)
        }
    },
    getSkillId:async(req:Request,res:Response)=>{
     try{
        const {id}=req.params
        const skillId=await SkillsService.getSkillById(parseInt(id))
        res.status(200).json(skillId)
    
     }catch(e){
        res.json('algo deu errado')
        console.log(e)
     }

    },
    postSkill:async(req:Request,res:Response)=>{
      
       try{
            const {idcurriculum,name}=req.body
            if(name !== ''){
                const newSkill=await SkillsService.addSkill(idcurriculum,name)
                res.status(200).json({'message':newSkill})
            }else{
                res.json('campo de categoria vazio')
            }
     }catch(e){

        res.json('algo deu errado')
          console.log(e)
      }

        
    },
    deleteSkill:async(req:Request,res:Response)=>{
        try{
            const {id}=req.params
            const response=await SkillsService.deleSkillById(parseInt(id))
            res.status(200).json(response)
        }catch(e){
            res.json(e)
        }
    }
}
    


