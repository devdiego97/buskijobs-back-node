import { contractTypeModel, IContractType } from "../Models/contractType.model"
import { jobsModel } from "../Models/jobs.model"




export const ContractTypeService={
 

    listContractTypes:async():Promise<IContractType[] | [] | object>=>{
        try{
            const contractTypesList=await contractTypeModel.findAll({include:[{model:jobsModel,as:'jobs'}]})
           return contractTypesList
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    },
    
    getContractTypeFromId:async(id:number):Promise<IContractType | object>=>{
        try{
            const contractTypeId=await contractTypeModel.findByPk(id,{include:{model:jobsModel,as:'jobs'}})
            if(contractTypeId){
                return contractTypeId
            }else{
                return {message:"tipo de contrato profissional não existe"}
            }
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    }
    



}

