import express from 'express'
import dotenv from 'dotenv'
import Routes from './Rotas/routes'
import cors from 'cors'


dotenv.config()
const api=express()
api.use(cors({
  origin:'*'
}))
api.use(express.json())
api.use('/public', express.static('public'));
api.use(express.urlencoded({extended:true}))
api.use(Routes)
api.listen(process.env.PORT,()=>console.log(`servidor rodando em http://localhost:${process.env.PORT}`))