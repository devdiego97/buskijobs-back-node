import { experiencesModel, IExperiences } from "../Models/experiences.model"





export const ExperienceService={
 

    listAllExperiences:async():Promise<IExperiences[] | [] | object>=>{
        try{
            let listExperiences=await experiencesModel.findAll()
            return listExperiences
        }catch(e){
            console.log(e)
            return {error:'algo deu errado na requisição.consulte os logs'}
        }
    },
    getExperiencesFromCurriculum:async(idcurriculum:number):Promise<IExperiences[] | [] | object>=>{
        try{
            let listExperiences=await experiencesModel.findAll({ where:{idcurriculum}})
            return listExperiences
        }catch(e){
            console.log(e)
            return {error:'algo deu errado na requisição.consulte os logs'}
        }

    },
    getExperiencesById:async(id:number):Promise<IExperiences | object>=>{
        try{
            let experienceId=await experiencesModel.findByPk(id)
            if(experienceId){
                return experienceId
            }else{
                return {message:'formação não existe'}
            }
        }catch(e){
            console.log(e)
            return {error:'algo deu errado na requisição.consulte os logs'}
        }

    },
    createExperience:async(data:Omit<IExperiences,'id'>):Promise<IExperiences | object>=>{
        try{
            let experience=await experiencesModel.create(data)
            return experience
        }catch(e){
            console.log(e)
            return {error:'algo deu errado na requisição.consulte os logs'}
        }
    },
    putExperienceFromId:async(data:Omit<IExperiences,'id'>,id:number):Promise<object>=>{
        try{
              await experiencesModel.update(data,{where:{id}})
              return {message:'experiencia atualizada'}
        }catch(e){
            console.log(e)
            return {error:'algo deu errado na requisição.consulte os logs'}
        }
    },
    deleteExperienceFromId:async(id:number):Promise<object>=>{
        try{
           await experiencesModel.findByPk(id)
            return {message:'experiencia deletada'}
        }catch(e){
            console.log(e)
            return {error:'algo deu errado na requisição.consulte os logs'}
        }
    }


}