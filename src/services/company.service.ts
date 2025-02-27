import { string } from "joi";
import { applicationsModel } from "../Models/applications.model";
import { categoryModel } from "../Models/categorys.model";
import { companyModel, ICompany } from "../Models/companys.model";
import { curriculumModel } from "../Models/curriculum.model";
import { jobsModel } from "../Models/jobs.model";
import { usersModel } from "../Models/users.model";
import fs from 'fs/promises'
import path from 'path'

export interface  RequestCompany{
    about?:string,
    cnpj?:string,
    logo?:string,
    instagram?:string,
    site?:string,
    linkedin?:string,
    city?:string,
    state?:string,
    name?: string,
    tel?: string,
    email?: string,
}

export const CompanyService={
 

    listAllCompanys:async():Promise<ICompany[] | []  | object>=>{
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

            return companys         
        }catch(e){
            console.log(e)
            return {error:'erro na requisição.consulte o log'}
        }
    },
    getCompanyFromUser:async(idcreator:number):Promise<ICompany | object>=>{
            try{
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
                              return company
                           }else{
                             return {message:'esse usuário nao possui uma empresa cadastrada'}
                           }
            }catch(e){
                console.log(e)
                return {error:'erro na requisição.consulte o log'}
            }
    },
    getCompanyFromId:async(id:number):Promise<ICompany | object>=>{
        try{
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
               return companyId
            }else{
                return {message:'empresa não existe'}
            }

        }catch(e){
            console.log(e)
            return {error:'erro na requisição.consulte o log'}
        }
    },
    createCompany:async(data:Omit<ICompany,'id'>)=>{
        try{
            const newCompany = await companyModel.create(data)
            return newCompany
        }catch(e){
            console.log(e)
            return {error:'erro na requisição.consulte o log'}
        }
    },
    putCompanyFromId:async(id:number,data:RequestCompany)=>{
        try{
            await companyModel.update(data,{where:{id}})
           return {message:'empresa atualizada'}

        }catch(e){
            console.log(e)
            return {error:'erro na requisição.consulte o log'}
        }
    },
    deleteCompanyFromId:async(id:number):Promise<object>=>{
        try{
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
                           return {message:'empresa deletada'}
                        }else{
                           return {message:'empresa não existe'}
                        }
        }catch(e){
            console.log(e)
            return {error:'erro na requisição.consulte o log'}
        }
    }


}