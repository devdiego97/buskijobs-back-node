import { applicationsModel, IApplications } from "../Models/applications.model"
import { categoryModel } from "../Models/categorys.model"
import { companyModel } from "../Models/companys.model"
import { contractTypeModel } from "../Models/contractType.model"
import { curriculumModel } from "../Models/curriculum.model"
import { jobsModel } from "../Models/jobs.model"
import { levelsModel } from "../Models/levels.model"
import { messagesModel } from "../Models/messagesview"
import { modelOperatingModel } from "../Models/modelOperating.model"
import { ITrainning } from "../Models/trainning.model"
import { usersModel } from "../Models/users.model"






export const ApplicationService={

    listApplications:async():Promise<IApplications[] | [] | object>=>{
        try{
           let  applications=await applicationsModel.findAll(
                            {
                                include:[
                                    {model:messagesModel,as:'messages'},
                                   {model:curriculumModel, as:'curriculum',
                                   include:[
                                     {model:usersModel,as:'user'}
                                   ]},
                                   { model:jobsModel, as:'job',
                                    include:[
                                        { model:companyModel, as:'company',
                                            include:[{model:usersModel,as:'user'}]
                                        },
                                        { model:categoryModel, as:'category'},
                                        { model:levelsModel, as:'levelJob'},
                                        { model:contractTypeModel, as:'jobContractType'},
                                        { model:modelOperatingModel , as:'modelOperating'}
                                    ]
                                   },
                                  
                                ]
                            }
                        )
            return  applications
        }catch(e){
            console.log(e)
            return {error:'algo deu errado ma requisição.consulte o log'}
        }
    },
    listApplicationsFromUser:async(idcurriculum:number):Promise<IApplications[] | [] | object>=>{
        try{
            let applications=await applicationsModel.findAll(
                {
                    where:{
                       idcurriculum:idcurriculum
                    },
                    include:[
                        {model:messagesModel,as:'messages'},
                        { model:curriculumModel, as:'curriculum',
                        include:[
                          {model:usersModel,as:'user'},
                          {model:levelsModel, as:'level'}
                        ]},
                        { model:jobsModel, as:'job',
                          include:[
                                { model:companyModel, as:'company',
                                    include:[{model:usersModel,as:'user'}]
                                },
                                { model:categoryModel, as:'category'},
                                { model:levelsModel, as:'levelJob'},
                                { model:contractTypeModel, as:'jobContractType'},
                                { model:modelOperatingModel , as:'modelOperating'}
                            ]
                       },
                       
                     ]
                }
            )
        
            return applications
        }catch(e){
            console.log(e)
            return {error:'algo deu errado ma requisição.consulte o log'}
        }
    },
    getApplicationId:async(id:number):Promise<IApplications | object>=>{
        try{
            const applicationid=await applicationsModel.findByPk(id,
            {
                include:[
                    {model:messagesModel,as:'messages'},
                    {model:curriculumModel,as:'curriculum',
                    include:[ { model:usersModel, as:'user'},
                        {model:levelsModel, as:'level'}]},
                   { model:jobsModel, as:'job',
                        include:[
                            { model:companyModel, as:'company',
                                include:[{model:usersModel,as:'user'}]
                            },
                            { model:categoryModel, as:'category'},
                            { model:levelsModel, as:'levelJob'},
                            { model:contractTypeModel, as:'jobContractType'},
                            { model:modelOperatingModel , as:'modelOperating'}
                        ]
                   },
                  
                ]
            })

            if(applicationid){
                return applicationid
            }else{
                return {messager:'canddiatura não existe'}
            }
        }catch(e){
            console.log(e)
            return {error:'algo deu errado ma requisição.consulte o log'}
        }
    },
    createApplication:async(idcurriculum:number,idjob:number,date:Date):Promise<ITrainning | object>=>{
        try{
            let newApplication=await applicationsModel.create({idcurriculum,idjob,date})
            return ({'message': 'candidatura feita com sucesso',newApplication})
        }catch(e){
            console.log(e)
            return {error:'algo deu errado ma requisição.consulte o log'}
        }
    },
    deleteApplication:async(id:number):Promise<object>=>{
        try{
            await applicationsModel.destroy({where:{id}})
            return {message:'canidadtura deletada'}
        }catch(e){
            console.log(e)
            return {error:'algo deu errado ma requisição.consulte o log'}
        }
    }

}