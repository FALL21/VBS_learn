const express = require("express");
const { addVideo, addView, deleteVideo, getVideo, random, trend, updateVideo } = require("../controllers/video.js");
const { verifyToken } = require("../verifyToken.js");

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo )
router.put("/:id", verifyToken, updateVideo )
router.delete("/:id", verifyToken, deleteVideo )
router.get("/find/:id", verifyToken, getVideo )
router.put("/view/:id", addView )
router.get("/trend", trend )
router.get("/random",random )

module.exports = router;
