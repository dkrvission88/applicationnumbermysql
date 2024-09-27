import mongoose from "mongoose";

const usermodel=new mongoose.Schema({
    name:{type:String,required:true},
    email:{
        type:String,required:true
    },
    password:{type:String,required:true},
    phone:{type:String}
})

export const User=new mongoose.model("Userdata",usermodel)