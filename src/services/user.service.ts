import { companyModel } from "../Models/companys.model"
import { curriculumModel } from "../Models/curriculum.model"
import { jobsModel } from "../Models/jobs.model"
import { IUser, usersModel } from "../Models/users.model"
import jwt from 'jsonwebtoken'
import path from 'path'
import fs from 'fs/promises'
import { schemaUpdate } from "../schemas/user"
import dotenv from 'dotenv'

dotenv.config()
export const UserService={
    listAllUsers:async():Promise<IUser[] | [] | object>=>{
        try{
               let users=await usersModel.findAll({
               include:[
                      {model:curriculumModel,as:'curriculum'},
                     { model:companyModel, as:'company',
                        include:[{model:jobsModel,as:'jobs'}]
                     }
  
                ]

            })
           return users
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.cosulte os logs'}
        }

    },
    listUsersFromType:async(type:string):Promise<IUser[] | [] | object>=>{
        try{
            const listUsersfromType=await usersModel.findAll({
                where:{type},
                include:[
                    {model:curriculumModel,as:'curriculum'},
                    { model:companyModel, as:'company',
                      include:[{model:jobsModel,as:'jobs'}]
                   }

              ] 
            })
          return listUsersfromType
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.cosulte os logs'}
        }

    },
    getUserFromId:async(id:number):Promise<IUser | object>=>{
        try{
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
             return user
           }else{
             return ({message:'usuário não existe'})
           }
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.cosulte os logs'}
        }

    },
    loginByUser:async(email: string, password: string, type: string)=>{
        try {
          
            const user = await usersModel.findOne({
                where: { email, password, type }
            })
    
            if (!user) {
                throw new Error('Usuário não existe')
            }
            const token = jwt.sign(
                { email: user.email, password: user.password, type },
                process.env.JWT_KEY as string
                
            )
    
            return { status: true, token, user }
        } catch (error) {
            throw error
        }

    },
    registerUserFromId:async(data: Omit<IUser,'id'>, file?: Express.Multer.File)=>{
        try{
            const hasUser = await usersModel.findOne({ where: { email: data.email, password: data.password } })
            if (hasUser) {
                throw new Error('usuário já existe')
            }
            const photo = file ? `public/images/${file.filename}` : null

            const user = await usersModel.create({ ...data, photo })
            const token = jwt.sign(
                { email: user.email, password: user.password, type: user.type },
                process.env.JWT_KEY as string
            )
    
            return { user, token, status: true }

        }catch(error){
            if (file) {
                const filePath = path.join(__dirname, `./../../public/images/${file.filename}`)
                try {
                    fs.unlink(filePath);
                    console.log('Arquivo enviado quando erro deletado')
                } catch (e) {
                    console.log('Erro ao deletar arquivo', e)
                }
            }
            throw error
        }
    

    },
    putUserById:async(id: string, data: any, file?: Express.Multer.File)=>{
        const user = await usersModel.findByPk(id)

        if (!user) {
            if (file) {
                const photoNewPath = path.join('public/images/', file.filename)
                await fs.unlink(photoNewPath)
            }
            throw new Error('Usuário não existe')
        }

        const result = schemaUpdate.validate(data, { abortEarly: false })

        if (result.error) {
            throw new Error(result.error.message)
        }

        const fotoAntigaPath = path.join(__dirname, `./../../${user.photo}`)

        try {
            await fs.unlink(fotoAntigaPath)
            console.log('Foto antiga excluída com sucesso.')
        } catch (error) {
            console.error('Erro ao excluir a foto antiga:', error)
        }

        const newPhoto = file ? `public/images/${file.filename}` : user.photo

        await usersModel.update({ ...data, photo: newPhoto }, { where: { id } })

        return 'Usuário atualizado com sucesso'
    }
    ,
    deleteUserFromId:async(id:number)=>{
        try{
                   let user=await usersModel.findOne({where:{id}})
                   if(user){
                       if(user.photo){
                           const fotoAntigaPath =path.join(__dirname, `./../../${user.photo}`)
                           try {
                             await fs.unlink(fotoAntigaPath);
                             console.log('Foto antiga excluída com sucesso.')
                           } catch (error) {
                             console.error('Erro ao excluir a foto antiga:', error)
                           }
                       }
                       await usersModel.destroy({
                           where:{id}
                       })
                       return {success:'usuário deletado'}
                   }else{
                     return {message:'usuário não existe'}
                   }
           
           
               }catch(e){
                   return {error:'algo deu errado.cosulte os logs'}
                   console.log(e)
               }
           }
    }

