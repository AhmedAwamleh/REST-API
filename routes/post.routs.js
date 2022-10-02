

'use strict'
const express = require('express')
const app = express()
const router = express.Router();
// const { Post } = require('../models/index')
// const { commentModel, userModel } = require('../models/index')
const { allPost, createPost, deletePost, updatePost } = require('../controllers/postControllers')
// const { deletePost } = require('../controllers/userControllers')
const Acl = require('../middlewares/ACL')
const bearerAuth = require('../middlewares/bearerAuth')
app.use(express.json())
router.get('/post', allPost);
router.post('/post', bearerAuth, Acl('create'), createPost);
router.delete('/post/:id', bearerAuth, Acl('delete'), deletePost);
router.put('/post/:id', bearerAuth, Acl('update'), updatePost);
// router.get('/CommentPost', getpostAndComment)
// router.get('/post', getPost)
// router.post('/post', createPost)
// router.get('/post/:id', findeOnePost)
// router.delete('/post/:id', bearerAuth, deletePost)
// router.put('/post/:id', updatePost)

// async function getPost(req, res) {
//     const post = await Post.read()
//     res.status(200).json({
//         post
//     })
// }

// async function createPost(req, res) {
//     console.log(req.body)
//     const newPost = req.body;
//     const post = await Post.create(newPost);
//     res.status(201).json(post)

// }

// async function findeOnePost(req, res) {
//     const id = req.params.id
//     const post = await Post.read({
//         where: {
//             id: id
//         }
//     });
//     res.status(200).json({
//         post
//     })
// }

// // async function deletepost(req, res) {
// //     const id = req.params.id;
// //     const deletedPost = await Post.delete({
// //         where: {
// //             id: id
// //         }
// //     })
// //     res.status(204).json({
// //         message: `Ownder has been deleted for owner id: ${id}`
// //     })
// // }

// async function updatePost(req, res) {
//     const id = req.params.id;
//     const opj = req.body
//     const post = await Post.findOne({
//         where: {
//             id: id
//         }
//     });
//     const updatedPost = await post.update({ opj })
//     res.status(200).json({ updatedPost })
// }

// async function getpostAndComment(req, res) {
//     const postComment = await Post.readWithComment(commentModel)
//     console.log(postComment)
//     res.status(200).json(postComment)
// }

module.exports = router



