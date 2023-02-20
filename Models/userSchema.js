const mongoose=require("mongoose")
const userScehma=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String,
    age : Number,
    city:String
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userScehma)

module.exports={
    UserModel
}