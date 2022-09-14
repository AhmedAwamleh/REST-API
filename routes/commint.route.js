'use strict'
const express = require('express')
const router = express.Router();
const { Comment } = require('../models/index')

router.get('/comment', getAllComment)
router.post('/comment/:id', addComment);
router.put('/comment/:id', updateComment);
router.delete('/comment/:id', deleteComment);


async function getAllComment(req, res) {
    const comments = await Comment.read();
    res.status(200).json({ comments })
}

async function addComment(req, res) {
    const newComment = req.body;
    const comment = await Comment.create(newComment)
    res.status(201).json(comment)
}
async function updateComment(req, res) {
    const id = req.params.id;
    const obj = req.body;
    const comment = await Comment.update(id, obj);
    res.status(201).json(comment);
}
async function deleteComment(req, res) {
    const id = req.params.id
    let deletedPost = await Comment.destroy({
        where: { id: id }

    })
    res.status(204).json(deletedPost)
}

module.exports = router