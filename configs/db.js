const mongoose=require("mongoose")
mongoose.set('strictQuery', false);
require("dotenv").config()
const connected=mongoose.connect(process.env.url)

module.exports={
    connected
}