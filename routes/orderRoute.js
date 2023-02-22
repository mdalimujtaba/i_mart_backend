const express=require("express")
const { authentication } = require("../Authentication/CartAuthentication")
const { orderModel } = require("../model/placeorderModel")
const orderRoute=express.Router()

orderRoute.get("/",async(req,res)=>{
    // let {userID}=req.body
    try {
        let data=await orderModel.find().populate([
            "userID",
            "product.productID"
        ])
        res.send({"msg":"You got the data ","data":data})
    } catch (error) {
        console.log(error)
        res.send({"msg":"Something went wrong"})
    }
})


orderRoute.delete("/delete/id",async(req,res)=>{
    const id=req.params.id
    try {
        await orderModel.findByIdAndDelete({_id:id})
        res.send({"msg":"item deleted"})
    } catch (error) {
        res.send({"msg":"Something went wrong"})
    }
})


orderRoute.use(authentication)


orderRoute.post("/addorder",async(req,res)=>{
    const {product,userID,date,address,quantity}=req.body  
   try {
    const data=await orderModel.create({product,userID,address,date,quantity})
    console.log(data)
    res.send({"msg":"product successfully added"})
   } catch (error) {
    console.log(error)
    res.send({"msg":"Something went wrong"})
   }

})

module.exports={
    orderRoute
}