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
    const {product,userID,address,quantity}=req.body
    // console.log("product",product)
    // console.log("userID",userID)
    // console.log("address",address)
    // console.log("quantity",quantity)
    
   try {
    const data=await historyModel.create({product,userID,address,quantity})
    console.log(data)
    res.send({"msg":"product successfully added"})
   } catch (error) {
    console.log(error)
    res.send({"msg":"Something went wrong"})
   }

})

module.exports={
    historyRoute
}