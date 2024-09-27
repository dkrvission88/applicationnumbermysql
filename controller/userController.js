import { User } from "../models/userModule.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are required" });
    }

    const userExit = await User.findOne({ email });
    if (userExit) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exist" });
    }
    const Salt = await bcrypt.genSalt(10);
    const hasshedpassword = await bcrypt.hash(password, Salt);
    const user=await User.create({
        name, email, password :hasshedpassword, phone

    })
    res.status(201).json({ success: true, message: "User created successfully",user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login=async(req,res)=>{
    try{
        const{email,password}=req.body
        if(!email || !password){
            return res.status(400).json({
                success:false,message:"All Fields are Required !!!"
            })
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:"enter Valid Email !!!"})
        }

        const ismatched=await bcrypt.compare(password,user.password)
        if(!ismatched){
            return res.status(400).json({success:false,message:"Enter Correct Password !!!"})
        }

        const userId={userid:user._id}
        const token=await jwt.sign(userId,process.env.SECRET_KEY,{expiresIn:"1d"})
        res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true}).json({success:true,message:"Login Successfully !!!",user,token})

    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}


export const update=async(req,res)=>{
    try{
        const {id}=req.params
        const {name,email,phone}=req.body
        const updateuser=await User.findByIdAndUpdate(id,{name,email,phone},{new:true,runValidators:true})
        if(!updateuser){
            return res.status(404).json({success:false,message:"user is not Found!!!"})
        }
        res.status(200).json({success:true,message:"User SuccessFully Updated!!!",updateuser})
        

    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const getalluser=async(req,res)=>{
    try{

        const allusers=await User.find({})
        if(!allusers){
            return res.status(404).json({success:false,message:"user is not Available !!!"})
        }
        res.status(200).json({success:true,message:"All user Fetched here !!!",allusers})

    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const getOne=async(req,res)=>{
    try{
        const{id}=req.params
        const single=await User.findOne({_id:id})
        if(!single){
            return res.status(404).json({success:false,message:"user is not Found !!!"})
        }
        res.status(200).json({success:true,message:"user is Selected !!!",single})

    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}
