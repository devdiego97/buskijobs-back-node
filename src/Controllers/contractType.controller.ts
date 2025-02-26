import { contractTypeModel } from './../Models/contractType.model';
import { Response,Request } from "express"
import { jobsModel } from "../Models/jobs.model"
import { ContractTypeService } from '../services/contractType.service';




export const ContractTypesController={
    
    getContractTypeAll:async(req:Request,res:Response)=>{
        try{
            const contractTypesList=await  ContractTypeService.listContractTypes()
            res.status(200).json(contractTypesList)

        }catch(e){
            res.status(500).json({error:'algo deu errado.consulte o log'})
            console.log(e)
        }
    },
    getContractTypeId:async(req:Request,res:Response)=>{
     try{
        const {id}=req.params
        const response=await ContractTypeService.getContractTypeFromId(parseInt(id))
        res.status(200).json(response)
     }catch(e){
        res.status(500).json({error:'algo deu errado.consulte o log'})
        console.log(e)
     }

    }
  

}