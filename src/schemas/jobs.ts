
import j, { optional } from 'joi'

export const schemaJob = j.object({
    companyid: j.number().required(),
    categoryid: j.number().required(),
    jobContractTypeId:j.number().required(),
    jobLevelId:j.number().required(),
    modelOperatingId:j.number().required(),
    title: j.string().trim().min(3).max(70).required(),
    city: j.string().trim().min(5).max(200).optional(),
    state: j.string().trim().min(2).max(2).optional(),
    salary: j.number().precision(2).positive().required(),
    description: j.string().trim().min(10).max(770).required(),
    benefits: j.string().trim().max(750).required(),
    requirements: j.string().trim().max(750).required(),
    createDate: j.string().trim().optional(),
    expireDate: j.date().allow(true).optional(),
    exclusivepcd:j.number().allow(true).max(1).optional(),
    dateSubscriptionMax:j.string().optional(),

  });


  export const schemaJobUpdate = j.object().keys(({
    title: j.string().min(3).max(30).optional(),
    salary: j.number().optional(),
    status:j.string().trim().optional(),
    dateSubscriptionMax:j.date().optional(),
    city: j.string().min(5).max(200).optional(),
    state: j.string().min(3).max(2).optional(),
    description: j.string().min(10).max(770).optional(),
    location: j.string().max(50).optional(),
    benefits: j.string().max(750).optional(),
    requirements: j.string().max(750).optional(),
    createDate: j.string().optional(),
    expireDate: j.string().optional(),
    exclusivepcd:j.number().max(1).optional(),
    contractType:j.string().max(30).optional(),

  })).unknown(true)