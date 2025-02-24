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


export const applicationController = {
    
    getAllApplications:async(req:Request,res:Response)=>{
        try{
            const {idcurriculum}=req.body

            const applications=await applicationsModel.findAll(
                {
                    include:[
                        {model:messagesModel,as:'messages'},
                       {model:curriculumModel, as:'curriculum',
                       include:[
                         {model:usersModel,as:'user'}
                       ]},
                       { model:jobsModel, as:'job',
                        include:[
                            { model:companyModel, as:'company',
                                include:[{model:usersModel,as:'user'}]
                            },
                            { model:categoryModel, as:'category'},
                            { model:levelsModel, as:'levelJob'},
                            { model:contractTypeModel, as:'jobContractType'},
                            { model:modelOperatingModel , as:'modelOperating'}
                        ]
                       },
                      
                    ]
                }
            )
            res.json(applications)
        }catch(e){
            res.json(e)
        }
    
    },
    getAllApplicationsFromUser:async(req:Request,res:Response)=>{
        try{
            const {idcurriculum}=req.params
            const applications=await applicationsModel.findAll(
                {
                    where:{
                       idcurriculum:idcurriculum
                    },
                    include:[
                        {model:messagesModel,as:'messages'},
                        { model:curriculumModel, as:'curriculum',
                        include:[
                          {model:usersModel,as:'user'},
                          {model:levelsModel, as:'level'}
                        ]},
                        { model:jobsModel, as:'job',
                          include:[
                                { model:companyModel, as:'company',
                                    include:[{model:usersModel,as:'user'}]
                                },
                                { model:categoryModel, as:'category'},
                                { model:levelsModel, as:'levelJob'},
                                { model:contractTypeModel, as:'jobContractType'},
                                { model:modelOperatingModel , as:'modelOperating'}
                            ]
                       },
                       
                     ]
                }
            )
            res.json(applications)
        }catch(e){
            res.json(e)
        }
    
    },
    getApplicationById:async(req:Request,res:Response)=>{
        try{
            let {id} = req.params
            const applicationid=await applicationsModel.findByPk(parseInt(id as string),
            {
                include:[
                    {model:messagesModel,as:'messages'},
                    {model:curriculumModel,as:'curriculum',
                    include:[ { model:usersModel, as:'user'},
                        {model:levelsModel, as:'level'}]},
                   { model:jobsModel, as:'job',
                        include:[
                            { model:companyModel, as:'company',
                                include:[{model:usersModel,as:'user'}]
                            },
                            { model:categoryModel, as:'category'},
                            { model:levelsModel, as:'levelJob'},
                            { model:contractTypeModel, as:'jobContractType'},
                            { model:modelOperatingModel , as:'modelOperating'}
                        ]
                   },
                  
                ]
            })
            if(applicationid){
                res.json(applicationid)
            }else{
                res.json('candidatura não existe')
            }
    
        }catch(e){
            res.json(e)
        }
    },
    postApplication:async(req:Request,res:Response)=>{
        try{
            const {idcurriculum,idjob,date}=req.body
            if(idcurriculum && idjob && date){
                let newApplication=await applicationsModel.create({idcurriculum,idjob,date})
                res.json({'message': 'candidatura feita com sucesso',newApplication})
            }else{
                res.json('dados não enviados')
            }
        }catch(e){
            res.json(e)
        }
    },
    deleteApplicationById:async(req:Request,res:Response)=>{
        try{
            let {id} = req.params
            await applicationsModel.destroy({where:{id}})
            res.json('candidatura excluida')
        }catch(e){
            res.json(e)
        }
    }

}