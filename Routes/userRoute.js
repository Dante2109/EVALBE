const express=require("express");
const userRouter=express.Router();
const {UserModel}=require("../Models/userSchema")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

userRouter.get("/",(req,res)=>{
    res.send("user working")
})

userRouter.post("/register",async(req,res)=>{
        let data=req.body;
      
        try {       
            let count=await UserModel.count({email:data.email})
            if(!count){
                bcrypt.hash(data.password, 5, async(err, hash)=> {
                    if(hash){
                        let user= new UserModel({...data,password:hash})
                        await user.save();
                        res.send({msg:"User is registered with the following details",userDetails:user})
                }else{
                    res.send(err.message)
                }
            });
        }else{
            res.send("User already exist, please login")
        }   
    } catch (error) {
        res.send(error.message)
    }
})

userRouter.post("/login",async(req,res)=>{
    let data=req.body;
    try {
        let user=await UserModel.find({email:data.email})
        if(user.length){
            bcrypt.compare(data.password, user[0].password, function(err, result) {
                if(result){
                    const token = jwt.sign({ userId: user[0]._id }, 'shhhhh');
                    res.send({msg:"User has been signed in successfully",token})
                }else{
                    res.send({msg:"Wrong password",error:err.message})
                }
            });
        }else{
            res.send("Wrong credentials")
        }
    } catch (error) {
        res.send(error.message)
    }
})
module.exports={
    userRouter
}