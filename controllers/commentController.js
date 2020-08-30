const db = require('../data/db')
const { insertComment } = require('../data/db')

exports.postComment = async (req, res) => {
    const { id } = req.params
    if (!req.body.text) {
        res.status(400).json({
            status: 400,
            message: "Please provide text"
        })
    }
    try {

        let newComment = {
            text: req.body.text,
            post_id: id
        }
        await insertComment(newComment)

        res.status(201).json({
            status: 201,
            message: "Successfully posted comment"
        })

    } catch (error) {
        res.status(404).json({
            status: 404,
            message: `Unable to find post with id of ${id}`
        })

    }
}

exports.getComments = async (req, res) => {
    const { id } = req.params
    try {
        let comments = await db.findPostComments(id)

        res.status(200).json({
            status: 200,
            results: comments.length,
            payload: {
                comments
            }
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Unable to retrieve comments from database"
        })
    }
}

exports.updateComment = async (req, res) => {
    res.send('under contruction')
}

exports.deleteComment = async (req, res) => {
    res.send('under construction')
}