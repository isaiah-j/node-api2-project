const db = require('../data/db')

exports.createPost = async (req, res, next) => {

    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            status: 400,
            message: "Please provide a title and description"
        })
        return
    }
    let newPost = {
        title: req.body.title,
        contents: req.body.contents
    }
    try {
        const result = await db.insert(newPost)
        res.status(201).json({
            status: 201,
            payload: {
                post: result
            }
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Cannot create post"
        })

    }
}

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await db.find()
        res.status(200).json({
            status: 200,
            results: posts.length,
            payload: {
                posts
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Unable to retrieve posts"
        })
    }
}

exports.getPost = async (req, res, next) => {
    const { id } = req.params
    try {
        let post = await db.findById(id)

        if (post.length == 0) {
            res.status(404).json({
                status: 404,
                message: `unable to find post with id of ${id}`
            })
        }

        res.status(200).json({
            status: 200,
            payload: {
                post
            }
        })

    } catch (error) {
        res.status(404).json({
            status: 500,
            message: `Unable to get post`
        })
    }
}

exports.updatePost = async (req, res) => {
    const { id } = req.params
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            status: 400,
            message: "Please provide a title and contents"
        })
    }
    try {
        let newPost = {
            title: req.body.title,
            contents: req.body.contents
        }

        let result = await db.update(id, newPost)

        if (!result) {
            res.status(404).json({
                status: 404,
                message: `unable to find post with id of ${id}`
            })
        }

        res.status(201).json({
            status: 200,
            message: "Successfully updated post"
        })


    } catch (error) {
        res.status(500).json({
            status: 400,
            message: "Unable to update post"
        })

    }
}


exports.deletePost = async (req, res) => {
    const { id } = req.params
    try {
        const result = await db.remove(id)
        if (!result) {
            res.status(404).json({
                status: 404,
                message: `Unable to find post with id of ${id}`
            })
        }
        res.status(200).json({
            status: 200,
            message: "Successfully deleted post"
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Unable to delete post"
        })
    }
}
exports.postComment = async (req, res) => {
    res.send('Commment posted')
}

exports.getComments = async (req, res) => {
    res.send('comments')
}

exports.updateComment = async (req, res) => {
    res.send('comment updated')
}

exports.deleteComment = async (req, res) => {
    res.send('Comment deleted')
}