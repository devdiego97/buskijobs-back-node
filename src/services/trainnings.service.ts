import { ITrainning, trainningsModel } from "../Models/trainning.model";



    
export const TrainningService={
 

    lisAllTrainnings:async():Promise<ITrainning[] | [] | object>=>{
            try{
                const lisTrainnings= await trainningsModel.findAll()
                return lisTrainnings
            }catch(e){
                console.log(e)
                return {error:'algo deu errado.consute o log'}
                
            }
    },
    listTrainningsByCurriculum:async(idcurriculum:number)=>{
        try{
            const trainningsList=await trainningsModel.findAll({where:{idcurriculum}})
            return trainningsList
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consute o log'}
        }
    },
    getTrainningById:async(id:number):Promise<ITrainning | object>=>{
        try{
            let trainningId=await trainningsModel.findByPk(id)
            if(trainningId){
                return trainningId
            }else{
                return {message:'treinamento não existe'}
            }
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consute o log'}
        }
    },
    addTrainning:async(data:Omit<ITrainning ,"id">):Promise<ITrainning | Object>=>{
        try{
            const newtrainning=await trainningsModel.create(data)
            return newtrainning
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consute o log'}
        }
    },
    updateTrainningFromId:async(data:Omit<ITrainning ,"id">,id:number):Promise<ITrainning | Object>=>{
        try{
            await  trainningsModel.update(data,{where:{id}})
            return {message:'treinamento atualizado'}
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consute o log'}
        }
    },
    deleteTrainningFromId:async(id:number):Promise<object>=>{
        try{
            await  trainningsModel.destroy({where:{id}})
            return {message:'treinamento deletado'}
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consute o log'}
        }
    }
   


}   