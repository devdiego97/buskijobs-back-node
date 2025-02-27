import { Request,Response } from "express"
import { IUser, usersModel } from "../Models/users.model"
import  jwt  from "jsonwebtoken"
import dotenv from 'dotenv'
import path from "path"
import fs from 'fs/promises'
import { schemaLogin, schemaRegister, schemaUpdate } from "../schemas/user"
import { UserService } from "../services/user.service"






export const userController={
    getAllUsers:async(req:Request,res:Response)=>{
        try{
           let list=await UserService.listAllUsers()
           res.status(200).json(list)
    
        }catch(e){
            res.status(500).json({error:'algo deu errado.cosulte os logs'})
            console.log(e)
         }
    },
    getAllUsersType:async(req:Request,res:Response)=>{
        try{
            const {type}=req.params
            const response=await UserService.listUsersFromType(type)
            res.status(200).json(response)
        }catch(e){
            res.status(500).json({error:'algo deu errado.cosulte os logs'})
            console.log(e)
        }
    },
    getUserById:async(req:Request,res:Response)=>{
        try{
            let {id}=req.params
            let response=await  UserService.getUserFromId(parseInt(id))
            res.status(200).json(response)
        }catch(e){
            res.status(500).json({error:'algo deu errado.cosulte os logs'})
            console.log(e)
        }
    },
    register:async(req:Request,res:Response)=>{
        try{
            let data:Omit<IUser,'id'>=req.body
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
                const response = await UserService.registerUserFromId(data, req.file)
                res.json(response)
            }

        }catch(e){
            res.status(500).json({error:'algo deu errado.cosulte os logs'})
            console.log(e)

        }
    },
    sigIn:async(req:Request,res:Response)=>{
        try {
            const data: { email: string, type: string, password: string } = req.body
            const result = schemaLogin.validate(data)
            if (result.error) {
                        res.json(result.error.message)
                    } else {
                        const response = await UserService.loginByUser(data.email, data.password, data.type)
                        res.json(response)
                    }
        } catch (error) {
                    res.status(500).json({ error: 'Algo deu errado. Consulte os logs' })
                    console.log(error)
        }
                
    },
    updateUserById:async(req:Request,res:Response)=>{
        const { id } = req.params
        const data = req.body

        try {
            const result = await UserService.putUserById(id, data, req.file)
            res.json(result)
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    },
    deleteUserById:async(req:Request,res:Response)=>{
        try{
            let {id}=req.params
           let response=await UserService.deleteUserFromId(parseInt(id))
           res.status(200).json(response)
        }catch(error: any) {
            res.status(400).json({ error: error.message })
        }
    }
}