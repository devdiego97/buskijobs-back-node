import { contractTypeModel } from './../Models/contractType.model';
import { Response,Request } from "express"
import { jobsModel } from "../Models/jobs.model"




export const ContractTypesController={
    
    getContractTypeAll:async(req:Request,res:Response)=>{
        try{
            const contractTypesList=await contractTypeModel.findAll({
                include:[
                    {model:jobsModel,as:'jobs'}
                ]
            })
            res.json(contractTypesList)

        }catch(e){
            res.json('algo deu errado')
            console.log(e)
        }
    },
    getContractTypeId:async(req:Request,res:Response)=>{
     try{
        const {id}=req.params
        const contractTypeId=await contractTypeModel.findByPk(parseInt(id as string),{include:{model:jobsModel,as:'jobs'}})

        if(contractTypeId){
            res.json(contractTypeId)
        }else{
            res.json({message:"tipo de contrato profissional não existe"})
        }
        

     }catch(e){
        res.json('algo deu errado')
        console.log(e)
     }

    }
  

}