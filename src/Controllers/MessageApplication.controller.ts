import { Request,Response } from "express"
import { messageSchemaPost, messageSchemaUpdate } from "../schemas/message"
import { MessageService } from "../services/message.service"



export  const MessageApplicationController={

    getAllMessages:async(req:Request,res:Response)=>{
        try{
            const list=await MessageService.listAllMessages()
            res.status(200).json(list)
        }catch(e){
            console.log(e)
            res.status(400).json({error:'algo deu errado ma requisição.consulte o log'})
        }
    },
    //todas as mensagens recebidas de um usuário
    getApplicationMessagesFromUser:async(req:Request,res:Response)=>{
       try{
         const {idcandidate}=req.params
         const response=await  MessageService.listApplicationMessagesByUser(parseInt(idcandidate as string))
         res.status(200).json(response)
        
       }catch(e){
        console.log(e)
        res.status(400).json({error:'algo deu errado ma requisição.consulte o log'})
    }
    },
     //todas as mensagens recebidas de um recruiter
     getMessagesFromRecruiter:async(req:Request,res:Response)=>{
        try{
          const {idrecruiter}=req.params
          const response=await MessageService.listApplicationMessagesByRecruiter(parseInt(idrecruiter))
          res.status(200).json(response)
         
        }catch(e){
            console.log(e)
            res.status(400).json({error:'algo deu errado ma requisição.consulte o log'})
        }
     },
    //uma mensagem id
    getApplicationMessageId:async(req:Request,res:Response)=>{
        try{
            const {id}=req.params
            const response=await MessageService.getMessageById(parseInt(id))
            res.status(200).json(response)
        }catch(e){
            console.log(e)
            res.status(400).json({error:'algo deu errado ma requisição.consulte o log'})
        }
    },

    //criar nova mensagem 
    postMessageFromApplication:async(req:Request,res:Response)=>{
        try{
            const data=req.body
             const result=messageSchemaPost.validate(data)
             if(result.error){
                res.json(result.error.details[0].message)
             }else{
                const newMessage={...data,date:Date.now()}
                const response=await MessageService.addMessageFromApplication(newMessage)
                res.status(200).json(response)
             }
        }catch(e){
            console.log(e)
            res.status(400).json({error:'algo deu errado ma requisição.consulte o log'})
        }
    },
    updateMessageId:async(req:Request,res:Response)=>{
        try{
            const data:{message:string,subject:string}=req.body
            const {id}=req.params
            const result=messageSchemaUpdate.validate(data)
            if(!result.error){
             const response=await MessageService.putMessageFromId(data,parseInt(id as string))
             res.status(200).json(response)
            }else{
                res.json(result.error.details[0].message)
            }
        }catch(e){
            console.log(e)
            res.status(400).json({error:'algo deu errado ma requisição.consulte o log'})
        }
    },
    deleteMessageId:async(req:Request,res:Response)=>{
        try{
            const {id}=req.params
            const response=await MessageService.deleteMessageFromId(parseInt(id))
            res.status(200).json(response)
        }catch(e){
            console.log(e)
            res.status(400).json({error:'algo deu errado ma requisição.consulte o log'})
        }
    }
}