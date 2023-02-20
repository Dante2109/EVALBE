const jwt=require("jsonwebtoken")
const authenticate=(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        jwt.verify(token, 'shhhhh', function(err, decoded) {
            if(decoded){
                req.body.user=decoded.userId;
                next()
            }else{
                res.send("Please login first")
            }
        });
    }else{
        res.send("Please login first")
    }
}
module.exports={
    authenticate
}