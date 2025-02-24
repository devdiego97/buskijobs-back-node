
import { CompanyType } from './../types/company'
import { Request,Response } from "express"
import { companyModel } from "../Models/companys.model"
import z from 'zod'
import { jobsModel } from "../Models/jobs.model"
import path from 'path'
import { usersModel } from "../Models/users.model"
import { schemaCompany, schemaCompanyUpdate } from "../schemas/company"
import fs from 'fs/promises'
import { curriculumModel } from '../Models/curriculum.model'
import { categoryModel } from '../Models/categorys.model'
import { applicationsModel } from '../Models/applications.model'


const companySchema=z.object({
    name:z.string().trim().max(40),
    city:z.string().trim(),
    tel:z.string().trim(),
    email:z.string().email().trim(),
    state:z.string().trim(),
    about:z.string().trim().min(100),
    cnpj:z.string().trim().min(14).max(20),
 
}).required()

export const companyController={
    getAllCompanys:async(req:Request,res:Response)=>{
        try{
            const companys=await companyModel.findAll({
                include:[
                   {model:usersModel,as:'user'},
                    {model:jobsModel,as:'jobs',
                    include:[          
                        {
                           model:applicationsModel,as:'applications',
                           include:[{model:curriculumModel,as:'curriculum',
                           include:[{model:usersModel,as:'user'}]
                           }]
                        },
                       { model:companyModel, as:'company',include:[ {model:usersModel, as:'user'}]},
                        { model:categoryModel, as:'category'}
                    ]
                  },
                    
                ]
            })
            res.json(companys)
        }catch(e){
            res.json(e)
        }
    },
    getCompanyFromUser:async(req:Request,res:Response)=>{
        try{
            const {idcreator}=req.params
            const company=await companyModel.findOne({
                where:{idcreator},
                include:[
                    {model:jobsModel,as:'jobs',
                    include:[
                        {
                           model:applicationsModel,as:'applications',
                           include:[{model:curriculumModel,as:'curriculum',
                           include:[{model:usersModel,as:'user'}]
                           }]
                        },
                        { model:companyModel, as:'company',include:[ {model:usersModel, as:'user'}]},
                        { model:categoryModel, as:'category'}
                    ]
                    },
                    {model:usersModel,as:'user'}
                ]
            })
           if(company){
            res.json(company)
           }else{
            res.json({message:'esse usuário nao possui uma empresa cadastrada'})
           }
        }catch(e){
            res.json(e)
        }
    },
    getCompanyById:async(req:Request,res:Response)=>{
        try{    
            const {id}=req.params
            const companyId=await companyModel.findOne({where:{id},
                include:[
                    {model:jobsModel,as:'jobs',
                        include:[
                            {
                                model:applicationsModel,as:'applications',
                                include:[{model:curriculumModel,as:'curriculum',
                                include:[{model:usersModel,as:'user'}]
                            }]
                            },
                            { model:companyModel, as:'company',include:[{model:usersModel, as:'user'}]},
                            { model:categoryModel, as:'category'}
                        ]
                    },
                    {model:usersModel,as:'user'},
                  
                   
                ]})
            if(companyId){
                res.json(companyId)
            }else{
                res.json('empresa não existe')
            }

        }catch(e){
            res.json(e)
        }
    },
    postCompany:async(req:Request,res:Response)=>{
        try{
            const data:CompanyType=req.body
            const result=schemaCompany.validate(data)
            if(result.error){
                res.json(result.error.message)
            }else{
                let logo=null
                if(req.file){
                    logo=req.file ? `${req.file.filename}` : null
                }
                const newCompany = await companyModel.create({...data,logo})
                res.json(newCompany)
            }
         
        }catch(e){
            res.json(e)
        }
    },
    updateCompanyById:async(req:Request,res:Response)=>{
      try{
        const data:CompanyType=req.body
        const {id}=req.params
        const company=await companyModel.findByPk(id)
        const result=schemaCompanyUpdate.validate(data)
        if(company){
            if(result.error){
                res.json(result.error.message)
            }else{
                const logoAntigaPath = path.join(__dirname, `./../../public/images/${company.logo}`)
                    try {
                      await fs.unlink(logoAntigaPath);
                      console.log('logo  antiga excluída com sucesso.');
                    } catch (error) {
                      console.error('Erro ao excluir a logo antiga:', error)
                    }
    
                    const newLogo = req.file ? `${req.file.filename}` : company.logo;
                    await companyModel.update({...data,logo:newLogo},{where:{id}})
                    res.json('empresa atualizada')
                }
            }
        else{
            if (req.file) {
                const logoNewPath = path.join('public/images/', req.file.filename)
                await fs.unlink(logoNewPath)
            }
            res.json('empresa não existe')
        }

      }catch(e){
        res.json(e)
      }


    },
    deleteCompanyById:async(req:Request,res:Response)=>{
        try{
            let {id}=req.params
            let company=await companyModel.findOne({where:{id}})
            if(company){
                if(company.logo){
                    const logoAntigaPath = path.join(__dirname, `./../../${company.logo}`)
                    try {
                      await fs.unlink(logoAntigaPath);
                      console.log('logo antiga excluída com sucesso.');
                    } catch (error) {
                      console.error('Erro ao excluir a logo antiga:', error)
                    }
                }
                await companyModel.destroy({
                    where:{id}
                })
                res.json({'message':'empresa deletada'})
            }else{
                res.json({'message':'empresa não existe'})
            }
    
    
        }catch(e){
            res.json(e)
        }
    }
}