
import { CompanyType } from './../types/company'
import { Request,Response } from "express"
import { companyModel, ICompany } from "../Models/companys.model"
import z from 'zod'
import { jobsModel } from "../Models/jobs.model"
import path from 'path'
import { usersModel } from "../Models/users.model"
import { schemaCompany, schemaCompanyUpdate } from "../schemas/company"
import fs from 'fs/promises'
import { curriculumModel } from '../Models/curriculum.model'
import { categoryModel } from '../Models/categorys.model'
import { applicationsModel } from '../Models/applications.model'
import { CompanyService, RequestCompany } from '../services/company.service'



export const companyController={
    getAllCompanys:async(req:Request,res:Response)=>{
        try{
            const companys=await CompanyService.listAllCompanys()
            res.status(200).json(companys)
        }catch(e){
            console.log(e)
            res.status(500).json({error:'erro na requisição.consulte o log'})
        }
    },
    getCompanyFromUser:async(req:Request,res:Response)=>{
        try{
            const {idcreator}=req.params
            const response=await CompanyService.getCompanyFromUser(parseInt(idcreator))
            res.status(200).json(response)
        }catch(e){
            console.log(e)
            res.status(500).json({error:'erro na requisição.consulte o log'})
        }
    },
    getCompanyById:async(req:Request,res:Response)=>{
        try{    
            const {id}=req.params
            const response=await CompanyService.getCompanyFromId(parseInt(id))
            res.status(200).json(response)
        }catch(e){
            console.log(e)
            res.status(500).json({error:'erro na requisição.consulte o log'})
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
               const d={...data,logo}
               let response=await CompanyService.createCompany(d as Omit<ICompany, "id">) 
               res.status(201).json(response) 
            }
         
        }catch(e){
            console.log(e)
            res.status(500).json({error:'erro na requisição.consulte o log'})
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
                    let d={...data,logo:newLogo}
                    let response=await CompanyService.putCompanyFromId(parseInt(id),d as RequestCompany)
                    res.status(200).json(response)
                }
            }
        else{
            if (req.file) {
                const logoNewPath = path.join('public/images/', req.file.filename)
                await fs.unlink(logoNewPath)
            }
            res.status(200).json({message:'empresa não existe'})
        }

      }catch(e){
        console.log(e)
        res.status(500).json({error:'erro na requisição.consulte o log'})
    }


    },
    deleteCompanyById:async(req:Request,res:Response)=>{
        try{
            let {id}=req.params
            let response=await CompanyService.deleteCompanyFromId(parseInt(id))
            res.status(200).json(response)
        }catch(e){
            console.log(e)
            res.status(500).json({error:'erro na requisição.consulte o log'})
        }
    }
}