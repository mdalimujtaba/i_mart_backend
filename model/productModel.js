const mongoose=require("mongoose")
const productSchema=mongoose.Schema({
    
    title:String,
    image:String,
    category:String,
    type:String,
    gender:String,
    price:Number,
    color:String,
    size:Number,
    available:Boolean,
    rating:Number,
    description:[{type: String}]
},{
    versionKey:false
})

const ProductModel=mongoose.model("productData",productSchema)
module.exports={
    ProductModel
}