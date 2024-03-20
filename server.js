import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors";
import bodyParser from "body-parser"
import route from "./routes/userroute.js";

const app=express()
app.use(cors())
app.use(bodyParser.json())
dotenv.config()

const PORT=process.env.PORT || 4000
const URL=process.env.MONGOURL

mongoose.connect(URL).then(()=>{
    console.log("connected to DB")
    app.listen(PORT,()=>{
        console.log(`server is running on the :${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})
app.use("/api",route);
console.log("sai")