import express, { urlencoded } from 'express'
import dotenv from "dotenv"
import DbConnect from './DB/dbConnect.js';
import authRouter from "./Routes/authRoutes.js"
import messageRoute from "./Routes/messageRoutes.js"
import cookieParser from 'cookie-parser';


const app=express()

dotenv.config();

DbConnect()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/api/auth', authRouter)
app.use('/api/message', messageRoute)


app.get("/",(req, res)  =>{
    res.send("server is working")
})





const PORT=process.env.PORT ||3000
app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
    
})