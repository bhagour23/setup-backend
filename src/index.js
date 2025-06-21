import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import db from './db';

dotenv.config({
    path:'./.env'
})
const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


db()
.then(()=>{
    app.listen(process.env.port,()=>{
        console.log(`port is running on ${port}`)
    })
})
.catch((err)=>console.log(err))