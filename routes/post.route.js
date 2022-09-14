'use strict'
const express = require('express');
const router = express.Router();
const { Post } = require('../models/index')
const { CommentModel } = require('../models/index')
router.get('/post', getPost);
router.post('/post', createPosts);
router.get('/post/:id', getOnePost);
router.delete('/post/:id', deletePost);
router.put('/post/:id', updatePost);

async function getPost(req, res) {
    let posts = await Post.readWithComments(CommentModel);
    res.status(200).json({
        posts
    });
}
async function createPosts(req, res) {
    console.log(req.body)
    let newPost = req.body;
    let post = await Post.create(newPost)
    res.status(201).json(post)
}


async function getOnePost(req, res) {
    let id = req.params.id
    let post = await Post.findOne({
        where: { id: id }
    })
    res.status(200).json(post)
}
async function deletePost(req, res) {
    const id = req.params.id
    let deletedPost = await Post.destroy({
        where: { id: id }

    })
    res.status(204).json(deletedPost)
}


async function updatePost(req, res) {
    let id = req.params.id
    let opj = req.body;
    let post = await Post.findOne({
        where: { id: id }
    })
    const updatedPost = await post.update(opj)
    res.status(200).json(updatedPost)

}


module.exports = router;