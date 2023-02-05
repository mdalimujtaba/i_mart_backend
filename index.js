const express=require("express")
require("dotenv").config()
const cors=require("cors")
const { connected } = require("./configs/db")
const { userRoute } = require("./routes/userRoute")
const { AdminRoute } = require("./routes/adminRoute")
const { productRoute } = require("./routes/productRoute")
const app=express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/user",userRoute)
app.use("/admin",AdminRoute)
app.use("/product",productRoute)


app.listen(process.env.port,async()=>{
    try {
        await connected
        console.log("connected to database")
    } catch (error) {
        console.log(error)
        
    }
    console.log(`server is running at http://localhost:${process.env.port}`)
})