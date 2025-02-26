import { Request,Response } from "express"
import { applicationsModel } from "../Models/applications.model"
import { companyModel } from "../Models/companys.model"
import { jobsModel } from "../Models/jobs.model"
import { usersModel } from "../Models/users.model"
import { curriculumModel } from "../Models/curriculum.model"
import { categoryModel } from "../Models/categorys.model"
import { levelsModel } from "../Models/levels.model"
import { contractTypeModel } from "../Models/contractType.model"
import { modelOperatingModel } from "../Models/modelOperating.model"
import { messagesModel } from "../Models/messagesview"
import { ApplicationService } from "../services/application.service"


export const applicationController = {
    
    getAllApplications:async(req:Request,res:Response)=>{
        try{
            const applications=await ApplicationService.listApplications()
            res.status(200).json(applications)
        }catch(e){
            console.log(e)
            res.status(500).json({error:'algo deu erraodo.consulte o console'})
        }
    
    },
    getAllApplicationsFromUser:async(req:Request,res:Response)=>{
        try{
            const {idcurriculum}=req.params
            const response=await ApplicationService.listApplicationsFromUser(parseInt(idcurriculum))
            res.status(200).json(response)
        }catch(e){
            res.json(e)
        }
    
    },
    getApplicationById:async(req:Request,res:Response)=>{
        try{
            let {id} = req.params
            let response=await ApplicationService.getApplicationId(parseInt(id))
            res.status(200).json(response)
        }catch(e){
            res.json(e)
        }
    },
    postApplication:async(req:Request,res:Response)=>{
        try{
            const {idcurriculum,idjob,date}=req.body
            if(idcurriculum && idjob && date){
                let response=await ApplicationService.createApplication(idcurriculum,idjob,date)
                res.status(200).json({'message': response})
            }else{
                res.status(200).json('dados não enviados')
            }
        }catch(e){
            res.json(e)
        }
    },
    deleteApplicationById:async(req:Request,res:Response)=>{
        try{
            let {id} = req.params
            let response=await ApplicationService.deleteApplication(parseInt(id))
            res.status(200).json(response)
        }catch(e){
            res.json(e)
        }
    }

}