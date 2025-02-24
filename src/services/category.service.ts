import { categoryModel, ICategory } from "../Models/categorys.model"
import { jobsModel } from "../Models/jobs.model"


export const CategoryService={
 

    listAllCategories:async():Promise<ICategory | object>=>{
       try{
            const categorysList=await categoryModel.findAll({
              include:[{model:jobsModel,as:'jobs'}]
            })

            return categorysList
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    },
    getCategoryFromId:async(id:number)=>{
      try{
        const categoryId=await categoryModel.findByPk(id)
        if(categoryId){
            return categoryId
        }else{
            return {'message':'categoria não existe'}
        }
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    },
    createCategory:async(name:string):Promise<ICategory | object>=>{
       try{
            const newCategory=await categoryModel.create({name})
            return newCategory
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    },
    updateCategoryFromId:async(id:number,name:string):Promise<Object>=>{
       try{
            await categoryModel.update({name},{where:{id}})
            return {'message':'categoria atualizada'}
         }catch(e){
             console.log(e)
             return {error:'algo deu errado.consulte o log'}
         }
    },
    deleteCategoryFromId:async(id:number):Promise<Object>=>{
        try{
          await categoryModel.destroy({where:{id}})
          return {'message':'categoria deletada'}
        }catch(e){
            console.log(e)
            return {error:'algo deu errado.consulte o log'}
        }
    }


}