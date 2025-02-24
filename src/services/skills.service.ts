import { ISKills, skillsModel } from "../Models/skills.model";


    
export const SkillsService={
 
    listAllSkills:async():Promise<ISKills[] | object>=>{
        try{
            const skillsList=await skillsModel.findAll()
             return skillsList
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    },
    listSkillsFromCurriculum:async(idcurriculum:number):Promise<ISKills[] | object>=>{
        try{
             const skillsList=await skillsModel.findAll({where:{idcurriculum}})
             return skillsList
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    },
    getSkillById:async(id:number):Promise<ISKills | object>=>{
        try{
            const skillId=await skillsModel.findByPk((id))
            if(skillId){
                return skillId
            }else{
                return  {message:'skill não existe'}
            }
       }catch(e){
           console.log(e)
           return {error:'algo deu errado.consulte o log'}
       }
    },
    addSkill:async(idcurriculum:number,name:string):Promise<Object>=>{
        try{
            const newSkill=await skillsModel.create({idcurriculum,name})
            return newSkill    
       }catch(e){
           console.log(e)
           return {error:'algo deu errado.consulte o log'}
       }

    },
    deleSkillById:async(id:number):Promise<Object>=>{
           try{
               await skillsModel.destroy({where:{id}})
               return {message:'skill deletada'}
            }catch(e){
                console.log(e)
                return {error:'algo deu errado.consulte o log'}
            }
    }
   
}   