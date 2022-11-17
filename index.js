const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoutes = require("./routes/users.js")
const videoRoutes = require("./routes/videos.js")
const commentRoutes = require("./routes/comments.js")
const authRoutes = require("./routes/auth.js")
const cookieParser = require("cookie-parser")

const app = express()
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.MONGO).then( ()=> { 
        console.log("Connected to DB")
    }).catch((err)=>{
        throw err ;
    });
}


app.use(cookieParser( ))
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "sucess!!!!";
        return res.status(status).json({
            sucess: false,
            status,
            message 
        })
})


app.listen(8800,()=>{
    connect()
    console.log("Connected to server");
})