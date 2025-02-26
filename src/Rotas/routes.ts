import { Router } from "express";
import { JobsController } from "../Controllers/jobs.controller";
import { companyController } from "../Controllers/companys.controller";
import { userController } from "../Controllers/users.controller";
import { applicationController } from "../Controllers/applications.controller";
import { experinceController } from "../Controllers/experience.controller";
import { trainningController } from "../Controllers/trainnings.controller";
import { curriculumController } from "../Controllers/curriculums.controller";
import { CategoryController } from "../Controllers/category.controller";
import { upload } from "../middlewares/upload";
import { SkillsController } from "../Controllers/skills.controller";
import { MessageApplicationController } from "../Controllers/MessageApplication.controller";
import { LevelsController } from "../Controllers/levels.controller";
import { ContractTypesController } from "../Controllers/contractType.controller";
import { modelOperatingController } from "../Controllers/modelOperating.controller";



const Routes=Router()

///jobs
Routes.get('/jobs',JobsController.getAllJobs)
Routes.get('/jobs/filtered',JobsController.getFilteredListJobs)
Routes.get('/companys/:companyid/jobs', JobsController.getAllJobsFromCompany)
Routes.get('/categorys/:categoryid/jobs', JobsController.getAllJobsFromCategory)
Routes.post('/jobs',JobsController.postJob)
Routes.get('/jobs/:id',JobsController.getJobById)
Routes.put('/jobs/:id',JobsController.updateJobById)
Routes.delete('/jobs/:id',JobsController.deleteJobById)


//levels
Routes.get('/levels',LevelsController.getLevels)
Routes.get('/levels/:id',LevelsController.getLevelId)
Routes.post('/levels',LevelsController.createLevel)
Routes.delete('/levels/:id',LevelsController.deleteLevelId)

//contract types
Routes.get('/contract-types',ContractTypesController.getContractTypeAll)
Routes.get('/contract-types/:id',ContractTypesController.getContractTypeId)

//model-operating
Routes.get('/models-operating',modelOperatingController.getModelsOperating)
Routes.get('/models-operating/:id',modelOperatingController.getModelOperatingId)
Routes.post('/models-operating',modelOperatingController.addNewModelOperating)
Routes.delete('/models-operating/:id',modelOperatingController.deleteModelOperatingId)

//categorys
Routes.get('/categorys',CategoryController.getCategorys)
Routes.post('/categorys',upload.single('logo'),CategoryController.postCategory)
Routes.get('/categorys/:id',CategoryController.getCategoryId)
Routes.put('/categorys/:id',CategoryController.updateCategory)
Routes.delete('/categorys/:id',CategoryController.deleteCategorys)


//companys
Routes.get('/companys',companyController.getAllCompanys)
Routes.post('/companys',upload.single('logo'),companyController.postCompany)
Routes.get('/users/:idcreator/companys',companyController.getCompanyFromUser)
Routes.get('/companys/:id',companyController.getCompanyById)
Routes.put('/companys/:id',upload.single('logo'),companyController.updateCompanyById)
Routes.delete('/companys/:id',companyController.deleteCompanyById)

//usuarios
Routes.get('/users',userController.getAllUsers)
Routes.get('/users/:type',userController.getAllUsersType)
Routes.post('/auth/sigin',userController.sigIn)
Routes.post('/auth/sigup',upload.single('photo'),userController.register)
Routes.get('/users/:id',userController.getUserById)
Routes.put('/users/:id',upload.single('photo'),userController.updateUserById)
Routes.delete('/users/:id',userController.deleteUserById)


Routes.get('/curriculuns',curriculumController.getAllCurriculuns)
Routes.get('/users/:iduser/curriculuns',curriculumController.getAllCurriculunFromUser)
Routes.post('/curriculuns',curriculumController.postCurriculum)
Routes.get('/curriculuns/:id',curriculumController.getCurriculumById)
Routes.put('/curriculuns/:id',curriculumController.updateCurriculum)
Routes.delete('/curriculuns/:id',curriculumController.deleteCurriculum)

//applications
Routes.get('/applications',applicationController.getAllApplications)
Routes.post('/applications',applicationController.postApplication)
Routes.get('/curriculuns/:idcurriculum/applications', applicationController.getAllApplicationsFromUser)
Routes.get('/applications/:id',applicationController.getApplicationById)
Routes.delete('/applications/:id',applicationController.deleteApplicationById)

//experiences
Routes.get('/experiences',experinceController.getAllExperiences)
Routes.get('/curriculums/:idcurriculum/experiences',experinceController.getAllExperiencesFromCurriculum)
Routes.post('/experiences',experinceController.postExperience)
Routes.get('/experiences/:id',experinceController.getExperiencesById)
Routes.put('/experiences/:id',experinceController.updateExperienceById)
Routes.delete('/experiences/:id',experinceController.deleteExperienceById)

//trainnings
Routes.get('/trainnings',trainningController.getAllTrainnings)
Routes.post('/trainnings',trainningController.postTrainning)
Routes.get('/curriculums/:idcurriculum/trainnings',trainningController.getAllTrainningsFromCurriculum)
Routes.get('/trainnings/:id',trainningController.getTrainningById)
Routes.put('/trainnings/:id',trainningController.updateTrainningById)
Routes.delete('/trainnings/:id',trainningController.deleteTrainningById)

Routes.post('/curriculuns/:idcurriculum/skills',SkillsController.getSkillsFromCurriculum)
Routes.get('/skills',SkillsController.getSkillsAll)
Routes.post('/skills',SkillsController.postSkill)
Routes.get('/skills/:id',SkillsController.getSkillId)
Routes.delete('/skills/:id',SkillsController.deleteSkill)

Routes.get('/messages',MessageApplicationController.getAllMessages)
Routes.post( '/messages',MessageApplicationController.postMessageFromApplication)
Routes.get( '/messages/candidates/:idcandidate',MessageApplicationController.getApplicationMessagesFromUser)
Routes.get( '/messages/recruiters/:idrecruiter',MessageApplicationController.getMessagesFromRecruiter)
Routes.get( '/messages/:id',MessageApplicationController.getApplicationMessageId)
Routes.put('/messages/:id',MessageApplicationController.updateMessageId)
Routes.delete( '/messages/:id',MessageApplicationController.deleteMessageId)

export default Routes