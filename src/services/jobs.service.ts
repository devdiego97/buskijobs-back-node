import { applicationsModel } from "../Models/applications.model"
import { categoryModel } from "../Models/categorys.model"
import { companyModel } from "../Models/companys.model"
import { contractTypeModel } from "../Models/contractType.model"
import { curriculumModel } from "../Models/curriculum.model"
import { IJobs, jobsModel } from "../Models/jobs.model"
import { levelsModel } from "../Models/levels.model"
import { modelOperatingModel } from "../Models/modelOperating.model"
import { usersModel } from "../Models/users.model"

interface PaginationOptions {
    page: number;
    pageSize: number;
    sortBy: string;
    status?:string,
    sortOrder: 'ASC' | 'DESC';
  }
  
  interface PaginatedResult {
    total: number
    page: number
    pageSize: number
    data: IJobs[],
    status?:string
  }

  interface FilterOptions {
    category?: string;
    mode?: string;
    contractType?: string;
    city?: string;
    state?: string;
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
    getJobsFiltered:async(status:'Ativa' | 'Cancelada' | 'Finalizada' | 'string')=>{
        try{
            const jobsListAll=await jobsModel.findAll(
                       {
                            where:{status},
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
    listFilteredJobsFromCompanyByStatus:async(options:PaginationOptions,status:string):Promise<PaginatedResult | []>=>{
            const { page, pageSize, sortBy, sortOrder} = options
            const offset = (page - 1) * pageSize;
        
            const { count, rows } = await jobsModel.findAndCountAll({
                where:{status},
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
          
        }
    ,
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
    createCompany:async(job:Omit<IJobs,'id'>):Promise<IJobs | object>=>{
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
            return{message:'vaga atualizada'}
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