const express=require("express");
const postRouter=express.Router();
const {PostModel}=require("../Models/postsSchema");
postRouter.get("/",async(req,res)=>{
    let userId=req.body.user;
    let device=req.query.device;
    let device1=req.query.device1;
    let device2=req.query.device2;
    if(device1 && device2){
        try {
            let data=await PostModel.find({user:userId,$or:[{device:device2},{device:device1}]})
            res.send(data)
        } catch (error) {
            res.send(error)
        }
    }else if(device){
        try {
            let data=await PostModel.find({user:userId,device})
            res.send(data)
        } catch (error) {
            res.send(error)
        }
    }else{
        try {
            let data=await PostModel.find({user:userId})
            res.send(data)
        } catch (error) {
            res.send(error)
        }
    }
})
postRouter.get("/top",async(req,res)=>{
    let userId=req.body.user;
    try {
        let data=await PostModel.findOne({user:userId}).sort({no_of_comments:-1})
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

postRouter.post("/create",async(req,res)=>{
    try {
        let post=new PostModel(req.body);
        await post.save();
        res.send({msg:`Your post is posted with is ${req.body.user}`,post:req.body})
    } catch (error) {
        res.send(error)
    }
})
postRouter.delete("/delete/:id",async(req,res)=>{
    let id=req.params.id
    try {
        let data=await PostModel.find({_id:id});
        if(data[0].user===req.body.user){
            try {
                await PostModel.findByIdAndDelete({_id:id});
                res.send("Post has been deleted")
            } catch (error) {
                res.send(error)
            }
        }else{
            res.send("You are not authorized to perform the following action")
        }
    } catch (error) {
        res.send(error)
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    let id=req.params.id
    try {
        let data=await PostModel.find({_id:id});
        console.log(data)
        if(data[0].user===req.body.user){
            try {
                await PostModel.findByIdAndUpdate({_id:id},req.body);
                res.send("Post has been updated")
            } catch (error) {
                res.send(error)
            }
        }else{
            res.send("You are not authorized to perform the following action")
        }
    } catch (error) {
        res.send(error)
    }
})


module.exports={
    postRouter
}