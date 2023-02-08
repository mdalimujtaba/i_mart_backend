const mongoose=require("mongoose")
mongoose.set('strictQuery', false);
require("dotenv").config()
let URL=process.env.URL
const connected=mongoose.connect(URL)

module.exports={
    connected
}