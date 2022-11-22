

const { createError } = require("../error.js") 
const Comment = require("../models/Comment")

//Create component without relationship
module.exports.createComment = async (request,response) => {
    const { description } = request.body;

    try {
        
        const comment = await Comment.create({
            description: description
        })

        response.status(201).json({
            message: "New comment created !",
            comment
        })
        
    } catch (error) {
        return createError(500, "Error when creating a comments")
    }
}

module.exports.getComments = async (request,response) => {

    try {
        const comments = await Comment.find();

        return response.status(200).json({
            message: "All comments",
            comments
        })
        
    } catch (error) {
        return createError(500, "Error when get all comments")
    }
}

module.exports.updateComment = async (request,response) => {
    const { id } = request.params;
    const { description } = request.body

    try {

        const comment = await Comment.findByIdAndUpdate(id,{
            description: description
        })
        
        comment.save();

        response.status(200).json({
            message:"Comment updated successfully !",
            comment
        })
        
    } catch (error) {
        return createError(500, "Error when updating comment !")
    }
}

module.exports.deleteComment = async (request,response) => {
    const { id } = request.params;

    try {
        
        const comment = await Comment.findByIdAndRemove(id);
        response.status(200).json({
            message: "Comment deleted successfully",
            comment
        })

    } catch (error) {
        return createError(500, "Error when deleting comment")
    }
}