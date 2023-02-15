const express=require("express")
const { authentication } = require("../Authentication/cartAuthentication")
const { historyModel } = require("../model/orderhistoryModel")
const historyRoute=express.Router()

historyRoute.use(authentication)

historyRoute.get("/",async(req,res)=>{
    let {userID}=req.body
    try {
        let data=await historyModel.find({userID}).populate([
            "userID",
            "product.productID"
        ])
        res.send({"msg":"You got the data ","data":data})
    } catch (error) {
        console.log(error)
        res.send({"msg":"Something went wrong"})
    }
})


historyRoute.post("/addproduct",async(req,res)=>{
    const {product,userID,date,address,quantity}=req.body
  
    
   try {
    const data=await historyModel.create({product,userID,date,address,quantity})
    // console.log(data)
    res.send({"msg":"product successfully added"})
   } catch (error) {
    console.log(error)
    res.send({"msg":"Something went wrong"})
   }

})

module.exports={
    historyRoute
}