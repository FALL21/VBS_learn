import User from "../models/User.js"
import Video from "../models/Video"
import { createError } from "../error.js"
import updateVideo from "../controllers/video.js"

export const addVideo = async (req,res,next) => {
   const newVideo = new Video({ userId: req.user.id, ...req.body })  
   try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
   } catch (err) {
    next(err)
   }
}
export const updateVideo = async (req,res,next) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "Video not found!"))
        if(req.user.id === video.userId){
            const updatedVideo = Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                 { new: true }
             );
             res.status(200).json(updatedVideo);
        }else{
            return next(createError(403, "You can update only your video!"))
        }
    } catch (err) {
        next(err)
    } 
}
export const deleteVideo = async (req,res,next) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, "The video has been deleted."))
        if(req.user.id === video.userId){
           await Video.findByIdAndDelete(
                req.params.id,
             );
             res.status(200).json(updatedVideo);
        }else{
            return next(createError(403, "You can deleted only video!"));
        }
} catch (err) {
    next(err) 
}   
}

export const getVideo = async (req,res,next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (err) {
        next(err) 
    }  
}

export const addView = async (req,res,next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })
        res.status(200).json("The views has been increased.")
    } catch (err) {
        next(err) 
    }  
}

export const random = async (req,res,next) => {
    try {
        const videos = await Video.aggregate([{$sample:{size: 40}}]);
        res.status(200).json(videos);
    } catch (err) {
        next(err) 
    }   
}

export const trend = async (req,res,next) => {
    try {
        const videos = await Video.find().sort({views:-1});
        res.status(200).json(videos);
    } catch (err) {
        next(err) 
    }   
}

export const sup = async (req,res,next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (err) {
        next(err) 
    }   
}
