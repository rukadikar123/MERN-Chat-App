import express, { urlencoded } from 'express'
import dotenv from "dotenv"
import DbConnect from './DB/dbConnect.js';
import authRouter from "./Routes/authRoutes.js"

const app=express()

dotenv.config();

DbConnect()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/auth', authRouter)


app.get("/",(req, res)  =>{
    res.send("server is working")
})





const PORT=process.env.PORT ||3000
app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
    
})