import express from "express";
import { addVideo, addView, deleteVideo, getVideo, random, trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo )
router.put("/:id", verifyToken, updateVideo )
router.delete("/:id", verifyToken, deleteVideo )
router.get("/find/:id", verifyToken, getVideo )
router.put("/view/:id", addView )
router.get("/trend", trend )
router.get("/random",random )
router.get("/sup", sup )

export default router; 