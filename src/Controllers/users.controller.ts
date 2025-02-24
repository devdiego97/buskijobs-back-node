import { Request,Response } from "express"
import { usersModel } from "../Models/users.model"
import  jwt  from "jsonwebtoken"
import dotenv from 'dotenv'
import path from "path"
import fs from 'fs/promises'
import { UserType } from "../types/user"
import { schemaLogin, schemaRegister, schemaUpdate } from "../schemas/user"
import { curriculumModel } from "../Models/curriculum.model"
import { companyModel } from "../Models/companys.model"
import { jobsModel } from "../Models/jobs.model"





dotenv.config()
export const userController={
    getAllUsers:async(req:Request,res:Response)=>{
        try{
            let users=await usersModel.findAll({
               include:[
                      {model:curriculumModel,as:'curriculum'},
                     { model:companyModel, as:'company',
                        include:[{model:jobsModel,as:'jobs'}]
                     }
  
                ]

            })
            res.json(users)
    
        }catch(e){
            res.status(404).json(e)
            console.log(e)
         }
    },
    getAllUsersType:async(req:Request,res:Response)=>{
        try{
            const {type}=req.params
            const listUsersfromType=await usersModel.findAll({
                where:{type},
                include:[
                    {model:curriculumModel,as:'curriculum'},
                   { model:companyModel, as:'company',
                      include:[{model:jobsModel,as:'jobs'}]
                   }

              ] 
            })
            res.json(listUsersfromType)


        }catch(e){
            res.json(e)
        }
    },
    getUserById:async(req:Request,res:Response)=>{
        try{
            let {id}=req.params
            let user=await usersModel.findOne(
                {where:{id},
                include:[
                    {model:curriculumModel,as:'curriculum'},
                   { model:companyModel, as:'company',
                      include:[{model:jobsModel,as:'jobs'}]
                   }

              ]
            }
            )
           if(user){
             res.json(user)
           }else{
             res.json({'message':'usuário não existe'})
           }
    
        }catch(e){
            res.json(e)
        }
    },
    register:async(req:Request,res:Response)=>{
        try{
            let data:UserType=req.body
            const result=schemaRegister.validate(data)
          
            if(result.error){
                res.json(result.error.message)
                const file=req.file ? `public/images/${req.file.filename}` : null
                const photoPath = path.join(__dirname, `./../../${file}`)
                try{
                 fs.unlink(photoPath)
                 console.log('arquivo enviado quando erro deletado')
                }catch(e){
                 console.log('erro ao deletar arquilo',e)
                }
            }else{
                let hasUser=await usersModel.findOne({where:{email:data.email,password:data.password}})
                if(!hasUser){
                    try {
                        const photo=req.file ? `public/images/${req.file.filename}` : null
                        const user=await usersModel.create({...data,photo})
                        const token=jwt.sign({email:user.email,password:user.password,type:user.type},process.env.JWT_KEY as string)
                        res.json({user,token,status:true})
                      } catch (error) {
                        res.json(error)
                        console.error('Erro de validação:', error);
                      }
                    
                }else{
                    res.json('usuário já existe')
                }
            }

        }catch(e){
            res.json(e)
            console.log(e)

           }
    },
    sigIn:async(req:Request,res:Response)=>{
            try{
                let data:{email:string,type:string,password:string}=req.body
                const result=schemaLogin.validate(data)
                if(result.error){
                    res.json(result.error.message)
                }else{
                    let user=await usersModel.findOne({
                        where:{email:data.email,password:data.password,type:data.type}
                    })
                    if(user){
                        const token=jwt.sign(
                            {email:user.email,password:user.password,type:data.type},
                            process.env.JWT_KEY as string
                        )
                     res.json({status:true,token,user})
                    }else{
                        res.json({message:'usuário não existe',status:false})
                    }
                }
    
            }catch(e){
                res.json(e)
                console.log(e)
    
        }
        
    },
    updateUserById:async(req:Request,res:Response)=>{
        const data:UserType=req.body
        const {id}=req.params
        const userid=await usersModel.findByPk(id) 
        const result=schemaUpdate.validate(data,{
            abortEarly: false,
        })
        if(result.error){
            res.json(result.error.message)
        }else{
            if(userid){
                const fotoAntigaPath = path.join(__dirname, `./../../${userid.photo}`)
                try {
                  await fs.unlink(fotoAntigaPath);
                  console.log('Foto antiga excluída com sucesso.');
                } catch (error) {
                  console.error('Erro ao excluir a foto antiga:', error)
                }

                const newPhoto = req.file ? `public/images/${req.file.filename}` : userid.photo;
                await usersModel.update({...data,photo:newPhoto},{where:{id}})
                res.json('usuário atualizado')
            }else{
                if (req.file) {
                    const photoNewPath = path.join('public/images/', req.file.filename)
                    await fs.unlink(photoNewPath)
                }
                res.json('usuário não existe')
            }

        }






    },
    deleteUserById:async(req:Request,res:Response)=>{
        try{
            let {id}=req.params
            let user=await usersModel.findOne({where:{id}})
            if(user){
                if(user.photo){
                    const fotoAntigaPath =path.join(__dirname, `./../../${user.photo}`)
                    try {
                      await fs.unlink(fotoAntigaPath);
                      console.log('Foto antiga excluída com sucesso.');
                    } catch (error) {
                      console.error('Erro ao excluir a foto antiga:', error)
                    }
                }
                await usersModel.destroy({
                    where:{id}
                })
                res.json({'sucess':'usuário deletado'})
            }else{
                res.json({'message':'usuário não existe'})
            }
    
    
        }catch(e){
            res.json(e)
        }
    }
}