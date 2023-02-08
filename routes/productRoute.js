const express=require("express")
const { ProductModel } = require("../model/productModel")
const productRoute=express.Router()

productRoute.get("/",async(req,res)=>{
    // let params=req.query.category
    let {category,_order}=req.query
  
    try {
        if(category!==undefined && category.length>0){
            // let arr=[]
           if(_order=="asc"){
            for(let i=0;i<category.length;i++){
                const output=await ProductModel.find({type:category[i]}).sort({price:1})
                res.send({"msg":"You got the data","data":output})
                
            }
           }
           else if(_order=="desc"){
            for(let i=0;i<category.length;i++){
                const output=await ProductModel.find({type:category[i]}).sort({price:-1})
                res.send({"msg":"You got the data","data":output})
                
            }
           }
           else{
            for(let i=0;i<category.length;i++){
                const output=await ProductModel.find({type:category[i]})
                res.send({"msg":"You got the data","data":output})
                
            }
           }
        }
        else if(_order){
            if(_order==="asc"){
                    
            const data=await ProductModel.find().sort({price:1})
            // console.log(data)
            res.send({"msg":"You got the data","data":data})
            }
            else if(_order=="desc"){
                const data=await ProductModel.find().sort({price:-1})
                // console.log(data)
                res.send({"msg":"You got the data","data":data})
            }
        }
        else{
            const data=await ProductModel.find().sort({price:1})
            // console.log(data)
            res.send({"msg":"You got the data","data":data})
        }
    } 
    catch (error) {
        res.send({"msg":"Something went wrong"})
    }
})

productRoute.get("/:id",async(req,res)=>{
    let id=req.params.id
    
    try {
        const data=await ProductModel.findOne({_id:id})
        res.send({"msg":"Got the Data","data":data})
    } catch (error) {
        res.send({"msg":"Something went wrong"})
        
    }
})
productRoute.post("/addProduct",async(req,res)=>{
    const payload=req.body
    try {
        const data=new ProductModel(payload)
        await data.save()
        res.send({"msg":"Product added to database"})
    } catch (error) {
        console.log(error)
        res.send({"msg":"Something went wrong"})
    }
})
productRoute.patch("/update/:id",async(req,res)=>{
    let payload=req.body
    let id=req.params.id
    try {
        await ProductModel.findByIdAndUpdate({_id:id},payload)
        res.send(`id no. ${id} is updated`)
    } catch (error) {
        console.log(error)
        res.send("Something went wrong")
    }
})

productRoute.delete("/delete/:id",async(req,res)=>{
    let id=req.params.id
    try {
        await ProductModel.findByIdAndDelete({_id:id})
        res.send(`id number ${id} is deleted`)
    } catch (error) {
        console.log(error)
        res.send("Something went wrong")
    }
})

module.exports={
    productRoute
}