const express=require("express")
const cors=require("cors")
require("dotenv").config()
const { connected } = require("./configs/db")
const { userRoute } = require("./routes/userRoute")
const { AdminRoute } = require("./routes/adminRoute")
const { productRoute } = require("./routes/productRoute")
const { cartRoute } = require("./routes/cartRoute")
const { historyRoute } = require("./routes/orderhistoryRoute")
const app=express()
app.use(cors({origin:'*'}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/user",userRoute)
app.use("/admin",AdminRoute)
app.use("/product",productRoute)
app.use("/cart",cartRoute)
app.use("/history",historyRoute)

let PORT=process.env.PORT||8080
app.listen(PORT,async()=>{
    try {
        await connected
        console.log("connected to database")
    } catch (error) {
        console.log(error)
        
    }
    console.log(`server is running at http://localhost:${PORT}`)
})