const express=require("express")
const cors=require("cors")
require("dotenv").config()
const { connected } = require("./configs/db")
const { userRoute } = require("./routes/userRoute")
const { AdminRoute } = require("./routes/adminRoute")
const { productRoute } = require("./routes/productRoute")
const { cartRoute } = require("./routes/cartRoute")
const app=express()
app.use(cors({origin:'https://i-mart-frontend-xi.vercel.app/'}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/user",userRoute)
app.use("/admin",AdminRoute)
app.use("/product",productRoute)
app.use("/cart",cartRoute)

let PORT=process.env.PORT
app.listen(PORT,async()=>{
    try {
        await connected
        console.log("connected to database")
    } catch (error) {
        console.log(error)
        
    }
    console.log(`server is running at http://localhost:${PORT}`)
})