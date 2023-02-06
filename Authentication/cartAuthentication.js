const jwt=require("jsonwebtoken")
 const authentication=(req,res,next)=>{
    let token=req.headers.authorization
    if(token){
        var decoded=jwt.verify(token,'projectreact')
        if(decoded){
            let userID=decoded.userID
            req.body.userID=userID
            console.log("userID",userID)
            next()
        }
        else{
            res.send({"msg":"Please Login "})
        }
    }
    else{
        res.send({"msg":"Please Login "})
    }
}

module.exports={
    authentication
}