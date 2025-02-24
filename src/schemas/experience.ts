import j, { optional } from 'joi'

export const schemaExperience=j.object({
    idcurriculum:j.number().required(),
    companyname:j.string().required(),
    office:j.string().required(),
    end:j.string().max(10).optional(),
    start:j.string().max(10).required(),
    active:j.number().max(1).optional(),
    about:j.string().max(300).required()
})
export const schemaExperienceUpdate=j.object().keys({
    idcurriculum:j.number().optional(),
    companyname:j.string().optional(),
    office:j.string().optional(),
    end:j.string().max(10).optional(),
    start:j.string().max(10).optional(),
    active:j.number().max(1).optional(),
    about:j.string().max(350).optional()
}).unknown(true)