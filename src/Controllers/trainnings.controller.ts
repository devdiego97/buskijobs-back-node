import { Request,response,Response } from "express"
import { schemaTrainnig, schemaTrainnigUpdate } from "../schemas/trainnings"
import { TrainningService } from "../services/trainnings.service"
import { ITrainning } from "../Models/trainning.model"

export const trainningController={

    getAllTrainnings:async(req:Request,res:Response)=>{
        try{
            let trainnings=await TrainningService.lisAllTrainnings()
            res.status(200).json(trainnings);
        }catch(e){
            console.log(e)
            res.status(500).json({error:'algo deu errado na requisição.consulte o log'})

        }
    },
    getAllTrainningsFromCurriculum:async(req:Request,res:Response)=>{
        try{
            const {idcurriculum}=req.params
            const result=await TrainningService.listTrainningsByCurriculum(parseInt(idcurriculum))
            res.status(200).json(result)
         }catch(e){
            console.log(e)
            res.status(500).json({error:'algo deu errado na requisição.consulte o log'})

        }
     
    },
    getTrainningById:async(req:Request,res:Response)=>{
        try{
            let {id}=req.params
            let result=await TrainningService.getTrainningById(parseInt(id))
           res.status(500).json(result)
        }catch(e){
            console.log(e)
            res.status(500).json({error:'algo deu errado na requisição.consulte o log'})

        }
    },
    postTrainning:async(req:Request,res:Response)=>{
        try{
            const {data}=req.body
            const result=schemaTrainnig.validate(data)
            if(result.error){
                res.status(500).json(result.error.message)
            }else{
                const response=await TrainningService.addTrainning(data)
                res.status(201).json(response)
            }
        
        }catch(e){
            console.log(e)
            res.status(500).json({error:'algo deu errado na requisição.consulte o log'})

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
             let  response=await TrainningService.updateTrainningFromId(data,parseInt(id))
              res.status(200).json(response)
            }
        
        }catch(e){
            console.log(e)
            res.status(500).json({error:'algo deu errado na requisição.consulte o log'})

        }
        
    },
    deleteTrainningById:async(req:Request,res:Response)=>{
        try{
            let {id}=req.params
            let response=await TrainningService.deleteTrainningFromId(parseInt(id))
            res.status(200).json(response)
        }catch(e){
            console.log(e)
            res.status(500).json({error:'algo deu errado na requisição.consulte o log'})
        }
    }

}