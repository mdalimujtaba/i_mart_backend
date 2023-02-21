const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { UserModel } = require("../model/userModel")

const userRoute=express.Router()
userRoute.get("/",async(req,res)=>{
    try {
        let output=await UserModel.find().sort({firstname:1})
        res.send({"msg":"You got data","data":output})
    } catch (error) {
        res.send({'msg':"Something went wrong"})
    }
})
userRoute.post("/signup",async(req,res)=>{
    const {firstname,lastname,email,password,cpassword}=req.body


    if(password===cpassword){
        try {
            bcrypt.hash(password, 5, async(err, safe)=> {
                if(err){
                    res.send({"msg":"Something went wrong"})
                }
                else{
                    let signup=new UserModel({firstname,lastname,email,password:safe})
                    await signup.save()
                    console.log(signup)
                    res.send({"msg":"Signup Successfull"})
                    
                }
            });
        } catch (error) {
            console.log(error)
            res.send({"msg":"Something went wrong"})
        }
    }
    else{
        res.send({"msg":"Enter same password"})
    }
})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const data=await UserModel.find({email})
        
        if(data.length>0 && data[0].email===email){
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

userRoute.patch("/update",async(req,res)=>{
    const {email,password}=req.body
    const user=await UserModel.findOne({email})
    // console.log(user)
    const id=user._id
    try {
        bcrypt.hash(password, 5, async(err, secure_pass)=> {
            if(err){
                res.send({"msg":"Something went Wrong"})
            }else{

                const newpassword=await UserModel.findByIdAndUpdate({_id:id},{password:secure_pass})
                console.log(newpassword)
                res.send({"msg":"Password Updated Successfully"})
            }
        })
    } catch(error){
        console.log(error)
        res.send({"msg":"Something went Wrong"})

    }
})
userRoute.delete("/delete/:id",async(req,res)=>{
    let id=req.params.id
    try {
        await UserModel.findByIdAndDelete({_id:id})
        res.send(`id number ${id} is deleted`)
    } catch (error) {
        console.log(error)
        res.send("Something went wrong")
    }
})
module.exports={
    userRoute
}