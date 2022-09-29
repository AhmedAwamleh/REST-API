

'use strict'
const express = require('express')
const app = express()
const router = express.Router();
const { Post } = require('../models/index')
const { commentModel } = require('../models/index')
app.use(express.json())
router.get('/CommentPost', getpostAndComment)
router.get('/post', getPost)
router.post('/post', createPost)
router.get('/post/:id', findeOnePost)
router.delete('/post/:id', deletePost)
router.put('/post/:id', updatePost)

async function getPost(req, res) {
    const post = await Post.read()
    res.status(200).json({
        post
    })
}

async function createPost(req, res) {
    console.log(req.body)
    const newPost = req.body;
    const post = await Post.create(newPost);
    res.status(201).json(post)

}

async function findeOnePost(req, res) {
    const id = req.params.id
    const post = await Post.read({
        where: {
            id: id
        }
    });
    res.status(200).json({
        post
    })
}

async function deletePost(req, res) {
    const id = req.params.id;
    const deletedPost = await Post.delete({
        where: {
            id: id
        }
    })
    res.status(204).json({
        message: `Ownder has been deleted for owner id: ${id}`
    })
}

async function updatePost(req, res) {
    const id = req.params.id;
    const opj = req.body
    const post = await Post.findOne({
        where: {
            id: id
        }
    });
    const updatedPost = await post.update({ opj })
    res.status(200).json({ updatedPost })
}

async function getpostAndComment(req, res) {
    const postComment = await Post.readWithComment(commentModel)
    res.status(200).json(postComment)
}

module.exports = router


'use strict';
