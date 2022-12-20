const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

require("./config/db");

//Routes
const userRoutes = require("./routes/user.route.js")
const videoRoutes = require("./routes/videos.js")
const commentRoutes = require("./routes/comment.routes.js")
const authRoutes = require("./routes/auth.js")
const cookieParser = require("cookie-parser")

const app = express()

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

app.listen(process.env.PORT,()=>{
    console.log("Connected to server ...");
});
