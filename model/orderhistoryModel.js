const mongoose=require('mongoose')
const historySchema=mongoose.Schema({
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
    quantity: {
        type: Number,
        required: false
      }
},{
    versionKey:false
})
const historyModel=mongoose.model('orderHistory',historySchema)
module.exports={
    historyModel
}