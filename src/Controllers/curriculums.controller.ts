import { jobsModel } from './../Models/jobs.model'
import { Request,Response } from "express"
import { curriculumModel } from "../Models/curriculum.model"
import { usersModel } from "../Models/users.model"
import { experiencesModel } from "../Models/experiences.model"
import { trainningsModel } from "../Models/trainning.model"
import { schemaCurriculum, schemaCurriculumUpdate } from "../schemas/curriculum"
import { skillsModel } from "../Models/skills.model"
import { companyModel } from "../Models/companys.model"
import { applicationsModel } from "../Models/applications.model"
import { categoryModel } from '../Models/categorys.model'
import { levelsModel } from '../Models/levels.model'


export const curriculumController = {
    getAllCurriculuns:async(req:Request,res:Response)=>{
        try{
            const curriculuns= await curriculumModel.findAll(
                {
                    include:[
                       { model:usersModel, as:'user'},
                       { model:skillsModel, as:'skills'},
                       { model:trainningsModel, as:'trainnings'},
                       { model:experiencesModel, as:'experiences'},
                      { model:levelsModel, as:'level'}
                    ]
                }
            )
            res.json(curriculuns)
        }catch(e){
            res.json(e)
        }
    },
    getAllCurriculunFromUser:async(req:Request,res:Response)=>{
        try{
            const {iduser}=req.params
            const curriculun= await curriculumModel.findOne(
                {
                    where:{iduser},
                    include:[
                        { model:usersModel, as:'user',
                         include:[ {model:curriculumModel,as:'curriculum'},{model:companyModel,as:'company'}]
                        },
                        { model:skillsModel, as:'skills'},
                        { model:trainningsModel, as:'trainnings'},
                        { model:experiencesModel, as:'experiences'},
                        { model:levelsModel, as:'level'},
                        { model:applicationsModel, as:'applications',
                             include:[ {model:jobsModel,as:'job',
                             include:[
                                { model:companyModel, as:'company'},
                                { model:categoryModel, as:'category'}
                             ]
                            
                            } ]
                        }
                     ]
                }
            )
           if(curriculun){
             res.json(curriculun)
           }else{
            res.json('curriculo não existe')
           }
        }catch(e){
            res.json(e)
        }
    },
    getCurriculumById:async(req:Request,res:Response)=>{
        try{
            const {id}=req.params
            const curriculumid=await curriculumModel.findByPk(id,
               { include:[
                    { model:usersModel, as:'user'},
                    { model:skillsModel, as:'skills'},
                    { model:trainningsModel, as:'trainnings'},
                    { model:levelsModel, as:'level'},
                    { model:experiencesModel, as:'experiences'},
                    { model:applicationsModel, association:'applications',
                    include:[
                     {model:jobsModel,as:'job'}
                    ]
                    }
                 ]}
                 )
            if(curriculumid){
                res.json(curriculumid)
            }else{
                res.json({'message':'curriculo não existe'})
            }
    
        }catch(e){
            res.json(e)
        }

    },
    postCurriculum:async(req:Request,res:Response)=>{
            try{
                const data=req.body
                const result=schemaCurriculum.validate(data)
                if(result.error){
                    res.json({'informações pendentes':result.error.message})
                }else{
                    const newCurriculum = await curriculumModel.create(data)
                    res.json(newCurriculum)
                }

            }catch(e){
                res.json(e)
            }
    },
    updateCurriculum:async(req:Request,res:Response)=>{
        try{
            const {id}=req.params
            const data=req.body
            const result=schemaCurriculumUpdate.validate(data,
                {
                    abortEarly:false
                })
            if(result.error){
                res.json({'informações pendentes':result.error.message})
            }else{
                const curriculumId=await curriculumModel.findByPk(id,{include:usersModel})
                if(curriculumId){
                   await curriculumModel.update(data,{where:{id}})
                    res.json(curriculumId)
                }
            }
        }catch(e){
            res.json(e)
        }
    },
    deleteCurriculum:async(req:Request,res:Response)=>{
        try{
            const {id}=req.params
            await curriculumModel.destroy({where: {id}})
            res.json({'message':'curriculo deletado'})
        }catch(e){
            res.json(e)
        }
    }
}
