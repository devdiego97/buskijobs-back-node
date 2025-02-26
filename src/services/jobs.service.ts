import { applicationsModel } from "../Models/applications.model"
import { categoryModel } from "../Models/categorys.model"
import { companyModel } from "../Models/companys.model"
import { contractTypeModel } from "../Models/contractType.model"
import { curriculumModel } from "../Models/curriculum.model"
import { IJobs, jobsModel } from "../Models/jobs.model"
import { levelsModel } from "../Models/levels.model"
import { modelOperatingModel } from "../Models/modelOperating.model"
import { usersModel } from "../Models/users.model"


interface Filters {
    modelOperatingId?: number;
    jobContractTypeId?: number;
    state?: string;
    city?: string;
    categoryid?: number;
  }

interface PaginationOptions {
    page: number;
    pageSize: number;
    sortBy: string;
    status?:string,
    companyid?:number,
    sortOrder: 'ASC' | 'DESC';
  }
  
  interface PaginatedResult {
    total: number
    page: number
    pageSize: number
    data: IJobs[],
    companyid?:number,
    
  }

 
  


  

export const JobsService={
 

    listAllJobs:async (options: PaginationOptions): Promise<PaginatedResult>=>{
        const { page, pageSize, sortBy, sortOrder } = options
        const offset = (page - 1) * pageSize;
    
        const { count, rows } = await jobsModel.findAndCountAll({
            include:[
                {
                   model:applicationsModel,as:'applications',
                   include:[{model:curriculumModel,as:'curriculum',
                   include:[{model:usersModel,as:'user'}]
                   }]
                },
                { model:companyModel, as:'company',include:[ {model:usersModel, as:'user'}]},
                { model:categoryModel, as:'category'},
                { model:levelsModel, as:'levelJob'},
                { model:contractTypeModel, as:'jobContractType'},
                { model:modelOperatingModel , as:'modelOperating'}
            ],
          order: [[sortBy, sortOrder]],
          offset: offset,
          limit: pageSize,
        });
    
        return {
          total: count,
          page,
          pageSize,
          data: rows,
        }
      
    },
    listFilteredAllJobs:async (options: PaginationOptions,filters:Filters): Promise<PaginatedResult>=>{
        const { modelOperatingId, jobContractTypeId, state, city, categoryid } = filters
        const { page, pageSize, sortBy, sortOrder } = options

        const whereClause: any = {};

        if (modelOperatingId) whereClause.modelOperating = modelOperatingId;
        if (jobContractTypeId) whereClause.jobContractType = jobContractTypeId;
        if (state) whereClause.state = state;
        if (city) whereClause.city = city;
        if (categoryid) whereClause.category = categoryid;
      
        const offset = (page - 1) * pageSize;
    
        const { count, rows } = await jobsModel.findAndCountAll({
            where:whereClause,
            include:[
                {
                   model:applicationsModel,as:'applications',
                   include:[{model:curriculumModel,as:'curriculum',
                   include:[{model:usersModel,as:'user'}]
                   }]
                },
                { model:companyModel, as:'company',include:[ {model:usersModel, as:'user'}]},
                { model:categoryModel, as:'category'},
                { model:levelsModel, as:'levelJob'},
                { model:contractTypeModel, as:'jobContractType'},
                { model:modelOperatingModel , as:'modelOperating'}
            ],
          order: [[sortBy, sortOrder]],
          offset: offset,
          limit: pageSize,
        });
    
        return {
          total: count,
          page,
          pageSize,
          data: rows,
        }
      
    },
    listAllJobsByCompany:async(companyid:number):Promise<IJobs[] | [] | object>=>{
        try{
            const jobsList=await jobsModel.findAll(
                {
                     where:{companyid},
                     include:[
                         {
                            model:applicationsModel,as:'applications',
                            include:[{model:curriculumModel,as:'curriculum',
                            include:[{model:usersModel,as:'user'}]
                            }]
                         },
                         { model:companyModel, as:'company',include:[ {model:usersModel, as:'user'}]},
                         { model:categoryModel, as:'category'},
                         { model:levelsModel, as:'levelJob'},
                         { model:contractTypeModel, as:'jobContractType'},
                         { model:modelOperatingModel , as:'modelOperating'}
                     ]
                   
                })
            return jobsList
        }catch(e){
           console.log(e)
            return {error:'algo deu errado.consulte o log'}
          
        }
    },
    listAllJobsByCategory:async(categoryid:number):Promise<IJobs[] | [] | object>=>{
        try{
             const jobsListAll=await jobsModel.findAll(
            
                        {
                             where:{categoryid},
                             include:[
                              {
                                 model:applicationsModel,as:'applications',
                                 include:[{model:curriculumModel,as:'curriculum',
                                 include:[{model:usersModel,as:'user'}]
                                 }]
                              },
                              { model:companyModel, as:'company',include:[ {model:usersModel, as:'user'}]},
                              { model:categoryModel, as:'category'},
                              { model:levelsModel, as:'levelJob'},
                              { model:contractTypeModel, as:'jobContractType'},
                              { model:modelOperatingModel , as:'modelOperating'}
                          ]
                           
                        })
                    return jobsListAll
        }catch(e){
           console.log(e)
            return {error:'algo deu errado.consulte o log'}
          
        }
    },
   
    getJobFromId:async(id:number):Promise<IJobs | object>=>{
        try{
            const jobId=await jobsModel.findOne({where: {id},
                include:[
                   {
                      model:applicationsModel,as:'applications',
                      include:[{model:curriculumModel,as:'curriculum',
                      include:[{model:usersModel,as:'user'}]
                      }]
                   },
                   { model:companyModel, as:'company',include:[ {model:usersModel, as:'user'}]},
                   { model:categoryModel, as:'category'},
                   { model:categoryModel, as:'category'},
                   { model:levelsModel, as:'levelJob'},
                   { model:contractTypeModel, as:'jobContractType'},
                   { model:modelOperatingModel , as:'modelOperating'}
               ]
                
             },
             )
             if(jobId){
               return jobId
             }else{
                return({'message':'a vaga não existe'})
             }
        }catch(e){
           console.log(e)
            return {error:'algo deu errado.consulte o log'}
          
        }
    },
    createJob:async(job:Omit<IJobs,'id'>):Promise<IJobs | object>=>{
        try{
            const newJob=await jobsModel.create(job)
            return newJob
        }catch(e){
           console.log(e)
            return {error:'algo deu errado.consulte o log'}
          
        }
    },
    putJobFromId:async(data:Omit<IJobs,"id">,id:number):Promise<object>=>{
        try{
            await jobsModel.update(data,{where:{id}})
            return {message:'vaga atualizada'}
        }catch(e){
           console.log(e)
            return {error:'algo deu errado.consulte o log'}
          
        }
    },
    deleteJobFromId:async(id:number)=>{
        try{
            await jobsModel.destroy({where: {id}})
            return {success:'vaga deletada'}
        }catch(e){
           console.log(e)
            return {error:'algo deu errado.consulte o log'}
          
        }
    }


}