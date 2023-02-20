const express=require("express")
const cors=require("cors")
const {connection}=require("./Configs/db")
require("dotenv").config()
const {userRouter}=require("./Routes/userRoute")
const {postRouter}=require("./Routes/postRoute")
const { authenticate } = require("./Middleware/authenticate")

const app=express();

app.use(cors())
app.use(express.json())

app.use("/users",userRouter)
app.use(authenticate)

app.use("/posts",postRouter)


app.listen(process.env.PORT,async()=>{
    try {
        await connection 
        console.log("DB has been connected")
    } catch (error) {
        console.log(error)
    }
    console.log("Server has been connected")
})

