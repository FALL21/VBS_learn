const User =require("../models/User.js")
const Video =require("../models/Video") 
const { createError } =require("../error.js") 
const updateVideo =require("../controllers/video.js") 

module.exports.addVideo = async (req,res,next) => {
   const newVideo = new Video({ userId: req.user.id, ...req.body })  
   try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
   } catch (err) {
    next(err)
   }
}
module.exports.updateVideo = async (req,res,next) => {
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
module.exports.deleteVideo = async (req,res,next) => {
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

module.exports.getVideo = async (req,res,next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (err) {
        next(err) 
    }  
}

module.exports.addView = async (req,res,next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })
        res.status(200).json("The views has been increased.")
    } catch (err) {
        next(err) 
    }  
}

module.exports.random = async (req,res,next) => {
    try {
        const videos = await Video.aggregate([{$sample:{size: 40}}]);
        res.status(200).json(videos);
    } catch (err) {
        next(err) 
    }   
}

module.exports.trend = async (req,res,next) => {
    try {
        const videos = await Video.find().sort({views:-1});
        res.status(200).json(videos);
    } catch (err) {
        next(err) 
    }   
}

module.exports.sup = async (req,res,next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (err) {
        next(err) 
    }   
}
