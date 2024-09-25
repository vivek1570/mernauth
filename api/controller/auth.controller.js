import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup=async(req,res,next)=>{
   const {username,email,password}=req.body;
   const hashpassword=bcrypt.hashSync(password,10);
   const newUser=new User({username,email,password:hashpassword});
   try{
      await newUser.save();
   res.status(201).json({message:"User created successfully"});
   }
   catch(error)
   {
      next(error);
   }
}  


export const signin=async(req,res,next)=>{
   const {email,password}=req.body;
   try{
      const valid=await User.findOne({email});
      // console.log(valid);
      if(!valid) return next(errorHandler(401,"invalid credential"))
      const validpass=bcrypt.compareSync(password,valid.password);
   if(!validpass) return next(errorHandler(401,"the password entered is incorrect"));
   const token=jwt.sign({id:valid._id},process.env.JWT);
   console.log(validpass);
   const {password:hashpassword,...rest}=valid._doc;
   res.cookie('access_toke',token,{httpOnly:true}).status(200).json(rest)
   }
   catch(error)
   {
      next(error);
   }
}