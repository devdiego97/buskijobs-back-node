import j from 'joi'

export const schemaTrainnig=j.object({
    idcurriculum:j.number().required(),
    school:j.string().max(200).required(),
    name:j.string().max(200).required(),
    end:j.string().max(10).optional(),
    start:j.string().max(10).required(),
    type:j.string().max(100).required(),
    active:j.number().optional(),
})
export const schemaTrainnigUpdate=j.object().keys({
    school:j.string().max(200).optional(),
    name:j.string().max(200).optional(),
    end:j.string().max(10).optional(),
    start:j.string().max(10).optional(),
    type:j.string().max(100).optional(),
    active:j.number().optional(),
}).unknown(true)