import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userroute from './routes/user.routes.js';
import authroute from './routes/auth.routes.js';
dotenv.config();

const app=express();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
    console.log(err)
})

app.use(express.json());

app.listen(3000,()=>{
    console.log("server listeing on port 3000")

})


app.use("/api/user",userroute);
app.use("/api/auth",authroute);

app.use((err,req,res,next)=>{
    const statuscode=err.statuscode||500;
    const message=err.message||'internal server error';
    return res.status(statuscode).json({
        success:false,
        message,
        statuscode,
    });
})