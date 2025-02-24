import { Request,Response } from "express"
import { trainningsModel } from "../Models/trainning.model"
import { schemaTrainnig, schemaTrainnigUpdate } from "../schemas/trainnings"

export const trainningController ={

    getAllTrainnings:async(req:Request,res:Response)=>{
        try{
            let trainnings=await trainningsModel.findAll()
            res.json(trainnings);
        }catch(e){
            res.json(e)
        }
    },
    getAllTrainningsFromCurriculum:async(req:Request,res:Response)=>{
        try{
            const {idcurriculum}=req.params
            const trainnings=await trainningsModel.findAll(
                {
                    where:{idcurriculum}
                }
            )
            if(trainnings){
                res.json(trainnings)
            }else{
                res.json({message:'esse usuário não possui formação e cursos'})
            }
         }catch(e){
             res.json(e)
         }
     
    },
    getTrainningById:async(req:Request,res:Response)=>{
        try{
            let {id}=req.params
            let trainningId=await trainningsModel.findByPk(parseInt(id as string))
            if(trainningId){
                res.json(trainningId)
            }else{
                res.json({'message':'treinamento não existe'})
            }
        }catch(e){
            res.json(e)
        }
    },
    postTrainning:async(req:Request,res:Response)=>{
        try{
            const data=req.body
            const result=schemaTrainnig.validate(data)
            if(result.error){
                res.json(result.error.message)
            }else{
                const newtrainning=await trainningsModel.create(data)
                res.json(newtrainning)
            }
        
        }catch(e){
            res.json(e)
        }
    },
     
    updateTrainningById:async(req:Request,res:Response)=>{
        try{
            let data=req.body
            let {id}=req.params
            const result=schemaTrainnigUpdate.validate(data)
            if(result.error){
                res.json(result.error.message)
            }else{
              await trainningsModel.update(data,{where:{id}})
              res.json('treinamento atualizado')
            }
        
        }catch(e){
            res.json(e)
        }
        
    },
    deleteTrainningById:async(req:Request,res:Response)=>{
        try{
            let {id}=req.params
            await trainningsModel.destroy({where:{id}})
            res.json({"success":'treinamento deletada'})
        }catch(e){
            res.json(e)
        }
    }

}