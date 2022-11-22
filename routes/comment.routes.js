const express = require("express");
const commentController = require("../controllers/comment.controller")

const router = express.Router();

router.get('/comments', commentController.getComments);
router.post('/new-comment', commentController.createComment);
router.put('/update-comment/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.getComments);

module.exports = router;