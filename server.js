'use strict'
const express = require('express')
const cors = require('cors')
const app = express();
app.use(cors());
const postRouter = require('./routes/post.route')
app.use(express.json());
app.use(postRouter)


app.get('/', (req, res) => {
    res.status(200).json({
        message: 'home',
        code: 200
    })
})
function start(port) {
    app.listen(port, () => console.log(`up and running on port ${port}`))

}
module.exports = {

    start: start
}