const mongoose=require("mongoose")
const postScehma=mongoose.Schema({
    title : String,
    body : String,
    device : String,
    no_of_comments : Number,
    user:String
},{
    versionKey:false
})

const PostModel=mongoose.model("post",postScehma)

module.exports={
    PostModel
}