const express = require('express')
const db = require('./data/db')
const postRouter = require('./routes/postRoutes')

const app = express()
app.use(express.json())


app.use('/api/posts', postRouter)


module.exports = app