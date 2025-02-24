import { Response,Request } from "express"
import { categoryModel } from "../Models/categorys.model"
import { jobsModel } from "../Models/jobs.model"
import { CategoryService } from "../services/category.service"

export const CategoryController={
    
    getCategorys:async(req:Request,res:Response)=>{
        try{
            const categorysList=await categoryModel.findAll({
                include:[
                    {model:jobsModel,as:'jobs'}
                ]
            })
            res.json(categorysList)

        }catch(e){
            res.json('algo deu errado')
            console.log(e)
        }
    },
    getCategoryId:async(req:Request,res:Response)=>{
     try{
        const {id}=req.params
        const response=await CategoryService.getCategoryFromId(parseInt(id))
        res.status(200).json(response)

     }catch(e){
        res.json('algo deu errado')
        console.log(e)
     }

    },
    postCategory:async(req:Request,res:Response)=>{
      
       try{
            const {name}=req.body
            if(name !== ''){
                const response=await CategoryService.createCategory(name)
                res.status(200).json(response)
            }else{
                res.json('campo de categoria vazio')
            }
     }catch(e){
          res.json('algo deu errado')
          console.log(e)
      }

        
    },
    updateCategory:async(req:Request,res:Response)=>{
        try{
            const {id}=req.params
            const {name}=req.body
            if(name !== ''){
                const response=await CategoryService.updateCategoryFromId(parseInt(id as string),name)
                res.status(200).json(response)
            }else{
                res.json('campo de categoria vazio')
            }
        }catch(e){
            res.json('algo deu errado')
            console.log(e)
        }
    },
    deleteCategorys:async(req:Request,res:Response)=>{
        try{
            const {id}=req.params
             const response=await CategoryService.deleteCategoryFromId(parseInt(id as string))
             res.status(200).json(response)
           
        }catch(e){
            res.json('algo deu errado')
            console.log(e)
        }
    }
    









}