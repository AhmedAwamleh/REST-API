'use strict'
const express = require('express')
const router = express.Router();
const { Comment } = require('../models/index')

router.get('/comment', getAllComment)
router.post('/comment', addComment);
router.put('/comment/:id', updateComment);
router.delete('/comment/:id', deleteComment);
router.get('/comment/:id', findeOneComment)

async function getAllComment(req, res) {
    const comment = await Comment.read();
    res.status(200).json({ comment })
}

async function addComment(req, res) {
    console.log(req.body)
    const newComment = req.body;

    const comment = await Comment.create(newComment)
    res.status(201).json(comment)
}
async function findeOneComment(req, res) {
    const id = req.params.id
    console.log(req.params.id)
    const comment = await Comment.read({
        where: {
            id: id
        }
    });
    res.status(200).json({
        comment
    })
}


async function updateComment(req, res) {
    const id = req.params.id;
    const obj = req.body;
    const comment = await Comment.update(id, obj);
    res.status(201).json(comment);
}
async function deleteComment(req, res) {
    const id = req.params.id
    let deleteComment = await Comment.destroy({
        where: { id: id }

    })
    res.status(204).json(deleteComment)
}

module.exports = router