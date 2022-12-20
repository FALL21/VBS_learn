const express = require("express");
const { signin } = require("../controllers/auth.controller");
const { signup } = require("../controllers/auth.controller");

const router = express.Router();


//CREATE A USER
router.post("/signup", signup )

//SIGN IN 
router.post("/signin", signin)

//GOOGLE AUTH 

module.exports =  router;