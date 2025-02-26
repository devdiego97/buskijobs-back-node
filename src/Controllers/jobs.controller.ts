import {Request,response,Response} from 'express'
import { jobsModel } from '../Models/jobs.model'
import { schemaJob, schemaJobUpdate } from '../schemas/jobs'
import { JobsService } from '../services/jobs.service'
import { request } from 'http'





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
    getFilteredListJobs:async (req:Request,res:Response)=>{
      try{
         const filters = req.query as {
            modelOperating?: string
            jobContractType?: string
            state?: string
            city?: string
            category?: string,
            
          }

          const { page = 1, pageSize = 10, sortBy = 'id', sortOrder = 'ASC' } = req.query
      
          const result = await JobsService.listFilteredAllJobs( {
            page: Number(page),
            pageSize: Number(pageSize),
            sortBy: sortBy as string,
            sortOrder: sortOrder as 'ASC' | 'DESC'
           },filters)

           res.status(200).json({
            success: true,
            data: result,
            pagination: {
              total: result.total,
              totalPages: result.total,
              currentPage: page,
              pageSize,
            },
          })
      }catch(e){
         res.status(500).json({
            success: false,
            message: e instanceof Error ? e.message : 'Algo deu errado na requisição',
          })
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
               const response=await JobsService.createJob(jobData)
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
         await JobsService.deleteJobFromId(parseInt(id))
         res.json('vaga deletada')
      }catch(e){
         res.json(e)
         console.log(e)
      }
    }
}