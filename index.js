import express from "express"
import dotenv from "dotenv"
dotenv.config({})
import dataconnection from "./config/connection.js"
import router from "./Routes/userRoute.js"

const app=express()

app.use(express.json())
app.use("/api/user",router)



const port =process.env.PORT || 5000

app.listen(port,()=>{
    dataconnection()
    console.log(`server is Runnig on port ${port}`);
    
})




