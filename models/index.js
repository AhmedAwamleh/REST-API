'use strict'
const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model');
const comment = require('./comment.model')
const Collection = require('../collection/postAndcomment')
const User = require('./user.models')
const POSTGRES_URL = process.env.DATABASE_URL || "postgresql://awamleh:a@localhost:5432/awamleh";
// const POSTGRES_URL = process.env.DATABASE_URL || "postgresql://postgres:1312@localhost:4532/post"

const sequelizeOption = {
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false
    //   }
    // }
}


let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);

const postModel = post(sequelize, DataTypes)
const commentModel = comment(sequelize, DataTypes)
const userModel = User(sequelize, DataTypes)


postModel.hasMany(commentModel, { foreignKey: 'postID', sourceKey: 'id' })
commentModel.belongsTo(postModel, { foreignKey: 'postID', targetKey: 'id' })
userModel.hasMany(postModel, { foreignKey: 'userID', sourceKey: 'id' })
postModel.belongsTo(userModel, { foreignKey: 'userID', targetKey: 'id' })
userModel.hasMany(commentModel, { foreignKey: 'userID', sourceKey: 'id' })
commentModel.belongsTo(userModel, { foreignKey: 'userID', targetKey: 'id' })

const postCollection = new Collection(postModel)
const commenttCollection = new Collection(commentModel)
const userCollection = new Collection(userModel)

module.exports = {
    db: sequelize,
    Post: postCollection,
    Comment: commenttCollection,
    commentModel: commentModel,
    User: userModel,
    postModel: postModel,
    userCollection: userCollection
}



