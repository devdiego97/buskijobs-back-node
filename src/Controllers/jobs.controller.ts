import {Request,Response} from 'express'
import { jobsModel } from '../Models/jobs.model'
import { schemaJob, schemaJobUpdate } from '../schemas/jobs'
import { JobsService } from '../services/jobs.service'





export const JobsController={
    getAllJobs:async(req:Request,res:Response)=>{
      try{
         const { page = 1, pageSize = 10, sortBy = 'id', sortOrder = 'ASC' } = req.query
         const result = await JobsService.listAllJobs({
            page: Number(page),
            pageSize: Number(pageSize),
            sortBy: sortBy as string,
            sortOrder: sortOrder as 'ASC' | 'DESC',
          })
    
          res.status(200).json(result);
      }catch(e){
         res.status(500).json(e)
         console.log(e)
      }
    },
    getAllJobsFromCompany:async(req:Request,res:Response)=>{
      try{
         const {companyid}=req.params
         const response=await JobsService.listAllJobsByCompany(parseInt(companyid))
         res.status(200).json(response)
      }catch(e){
         res.json(e)
         console.log(e)
      }
    },
     getFilteredJobsFromCompanyByStatus:async(req:Request,res:Response)=>{
      try{
         const {status}=req.params
         const { page = 1, pageSize = 10, sortBy = 'id', sortOrder = 'ASC'} = req.query
            const result = await JobsService.listAllJobs({
               page: Number(page),
               status:status,
               pageSize: Number(pageSize),
               sortBy: sortBy as string,
               sortOrder: sortOrder as 'ASC' | 'DESC',
             })
     
    
          res.status(200).json(result);
      }catch(e){
         res.status(500).json(e)
         console.log(e)
      }

   
    },
    getAllJobsFromCategory:async(req:Request,res:Response)=>{
      try{
         const {categoryid}=req.params
        const response=await JobsService.listAllJobsByCategory(parseInt(categoryid as string))
        res.status(200).json(response)
      }catch(e){
         res.json(e)
         console.log(e)
      }
    },

    getFilteredJobs:async(req:Request,res:Response)=>{
      try{
         const { category, mode, contractType, city, state, page = 1, limit = 10 } = req.query;

         const filters = {
           category: category as string | undefined,
           mode: mode as string | undefined,
           contractType: contractType as string | undefined,
           city: city as string | undefined,
           state: state as string | undefined,
           page: parseInt(page as string, 10),
           limit: parseInt(limit as string, 10),
         };
   
         //const result = await JobsService.getJobsFiltered(filters)
        // res.json(result)
      }catch(e){
         res.status(500).json({ error: 'Internal Server Error' })
      }
    },
    getJobById:async(req:Request,res:Response)=>{
      try{
         const {id}=req.params
         const  response=await JobsService.getJobFromId(parseInt(id))
         res.status(200).json(response)
      }catch(e){
         res.json(e)
         console.log(e)
      }

    },
    postJob:async(req:Request,res:Response)=>{
     
         try{
            const jobData=req.body
            const result=schemaJob.validate(jobData)
           
            if(result.error){
               res.json({'informações necessárias estão pendentes':result.error.message})
            }else{
               const response=await jobsModel.create(jobData)
               res.status(200).json(response)
            }

         }catch(e){
            res.json(e)
         }

    },
    updateJobById:async(req:Request,res:Response)=>{
         try{
            const jobData=req.body
            const {id}=req.params
            const result = schemaJobUpdate.validate(jobData)
         if(result.error){
            res.json({'informações necessárias estão pendentes':result.error.message})
         }else{
             const response=await JobsService.putJobFromId(jobData,parseInt(id))
             res.status(200).json(response)
         }
      }catch(e){
         res.json(e)
      }
    },
   deleteJobById:async(req:Request,res:Response)=>{
      try{
         const {id} =req.params
         await jobsModel.destroy({where: {id}})
         res.json('vaga deletada')
      }catch(e){
         res.json(e)
         console.log(e)
      }
    }
}