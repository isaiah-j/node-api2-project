const express = require('express')
const postController = require('../controllers/postController')
const commentController = require('../controllers/commentController')


const router = express.Router()

router
    .route('/')
    .post(postController.createPost)
    .get(postController.getAllPosts)

router
    .route('/:id')
    .get(postController.getPost)
    .patch(postController.updatePost)
    .delete(postController.deletePost)

router
    .route('/:id/comments')
    .post(commentController.postComment)
    .get(commentController.getComments)
    .patch(commentController.updateComment)
    .delete(commentController.deleteComment)

module.exports = router