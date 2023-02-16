const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { AdminModel } = require("../model/adminModel")

const AdminRoute=express.Router()

AdminRoute.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body


   
        try {
            bcrypt.hash(password, 5, async(err, safe)=> {
                if(err){
                    res.send({"msg":"Something went wrong"})
                }
                else{
                    let signup=new AdminModel({name,email,password:safe})
                    await signup.save()
                    console.log(signup)
                    res.send({"msg":"Signup Succussfull"})
                    
                }
            });
        } catch (error) {
            console.log(error)
            res.send({"msg":"Something went wrong"})
        }
   
})

AdminRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const data=await AdminModel.find({email})
        if(data.length>0){
            bcrypt.compare(password, data[0].password, async(err, result)=>{
                if(result){
                    const token=jwt.sign({"userID":data[0]._id,"name":data[0].firstname},"projectreact")
                    res.send({"msg":"Login Successfull","token":token,"firstname":data[0].firstname})
                    
                }else{
                    res.send({"msg":"Wrong Credential"})
                }
            });
        }
        else{
            res.send({"msg":"Wrong Credential"})
        console.log(error)
        }
    } catch (error) {
        res.send({"msg":"Wrong Credential"})
        console.log(error)
    }
})


module.exports={
    AdminRoute
}