import { applicationsModel } from "../Models/applications.model";
import { jobsModel } from "../Models/jobs.model";
import { IMessage, messagesModel } from "../Models/messagesview";
import { usersModel } from "../Models/users.model";


export const MessageService={
 

    listAllMessages:async():Promise<IMessage[] | object>=>{
        try{
              const listMessagesAll=await messagesModel.findAll()
             return listMessagesAll
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    },
    listApplicationMessagesByUser:async(idcandidate:number):Promise<IMessage | object>=>{

        try{
           const  messagesList=await messagesModel.findAll({
                        where:{idcandidate : idcandidate},
                        include:[
                            {model:applicationsModel,as:'application',
                                include:[
                                    {model:jobsModel,as:'job'}
                                ]
                            },
                            {model:usersModel,as:'candidate'},
                            {model:usersModel,as:'recruiter'}
                        ]
                    })
           return messagesList
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    },
    listApplicationMessagesByRecruiter:async(idrecruiter:number):Promise<IMessage[] | object>=>{
        try{
            const messagesList=await messagesModel.findAll({
                where:{idrecruiter : idrecruiter},
                include:[
                    {model:applicationsModel,as:'application',
                        include:[
                            {model:jobsModel,as:'job'}
                        ]
                    },
                    {model:usersModel,as:'candidate'},
                    {model:usersModel,as:'recruiter'}
                ]
            })
            return messagesList
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    },
    getMessageById:async(id:number):Promise<IMessage | object>=>{
        try{
            const messageid=await messagesModel.findByPk(id,{
                include:[
                    {model:applicationsModel,as:'application',
                        include:[
                            {model:jobsModel,as:'job'}
                        ]
                    },
                    {model:usersModel,as:'candidate'},
                    {model:usersModel,as:'recruiter'}
                ]
             }
            )
            if(messageid){
                return messageid
            }else{
                return {message:'mensagem não existe'}
            }

        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    },
    addMessageFromApplication:async(data:Omit<IMessage,"id">):Promise<IMessage | object>=>{
        try{
            const message=await messagesModel.create(data)
            return {'success':'nova mensagem enviada'}
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    },
    putMessageFromId:async(data:{message:string,subject:string},id:number):Promise<IMessage | object>=>{
        try{
            await messagesModel.update(data,{where:{id}})
            return {'success':'mensagem atualizada'}
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    },
    deleteMessageFromId:async(id:number):Promise<object>=>{
        try{
            await messagesModel.destroy({where:{id}})
            return {'success':'mensagem deletada'}
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    }


}