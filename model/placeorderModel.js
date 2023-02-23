const mongoose=require('mongoose')
const orderSchema=mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'userSignup'
    },
    product: [{productID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'productData'
    }}],
    address:{
        type:String,
        required:true
    },
    finalTotal:{
        type:Number,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    quantity: {
        type: Number,
        required: false
      }
},{
    versionKey:false
})
const orderModel=mongoose.model('order',orderSchema)
module.exports={
    orderModel
}