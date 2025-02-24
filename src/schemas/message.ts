import j, { date } from 'joi'
import { strictObject } from 'zod'


export const messageSchemaPost=j.object({
    idrecruiter:j.number().required(),
    idapplication:j.number().required(),
    idcandidate:j.number().required(),
 subject:j.string().trim().min(5).max(150).required(),
    message:j.string().trim().min(10).max(500).required()
})


export const messageSchemaUpdate=j.object({
    subject:j.string().trim().min(5).max(150).optional(),
    message:j.string().trim().min(10).max(500).optional()

}).unknown(true)
