'use strict'
const express = require('express')
const router = express.Router();
const { Comment } = require('../models/index')

router.get('/comment', getAllComment)
router.post('/comment', crateComment);


async function getAllComment(req, res) {
    const comments = await Comment.findAll();
    res.status(200).json({ comments })
}

async function crateComment(req, res) {
    const newComment = req.body;
    const comment = await Comment.create(newComment)
    res.status(201).json(comment)
}

module.exports = router