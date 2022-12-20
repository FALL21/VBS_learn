const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    videoId: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    description: {
        type: String,
        require: true,
    },
},
{timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);