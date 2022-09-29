'use strict'
const express = require('express')
const cors = require('cors')
const app = express()
const postModel = require('./routes/post.routs')
const commentModel = require('./routes/comment.rout')
const userModel = require('./routes/user.routes')
app.use(cors());
app.use(express.json())
app.use(postModel)
app.use(commentModel)
app.use(userModel)

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'home',
        code: '200'
    })
})
function start(port) {
    app.listen(port, () => console.log(`app runing on port${port}`))
}

module.exports = {
    start
}

