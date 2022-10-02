const { postModel, User, commentModel } = require('../models/index')

const allPost = async (req, res) => {

  try {
    const post = await postModel.findAll({ include: [User, commentModel] });
    console.log(post)
    res.status(200).json(post)
  } catch (error) {
    console.log(error)
  }
}

const createPost = async (req, res) => {
  try {
    const data = req.body;
    const createdPost = await postModel.create(data);
    res.status(201).json(createdPost);
  } catch (error) {
    console.log(error)
  }
}

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.user.capabilities.includes('delete')) {
      return res.status(401).json({ message: 'only admin can delete' })
    }
    const deletePost = await postModel.destroy({ where: { id } });
    res.status(200).json({ message: 'Post has been deleted' })
  } catch (error) {
    console.log(error)
  }
}
async function updatePost(req, res) {
  const id = req.params.id;
  const opj = req.body
  const post = await postModel.findOne({
    where: {
      id: id
    }
  });
  const updatedPost = await post.update({ opj })
  res.status(200).json({ updatedPost })
}

module.exports = {
  allPost,
  createPost,
  deletePost,
  updatePost
}