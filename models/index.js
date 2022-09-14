'use strict'
const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model');
const comment = require('./comment.model')
const POSTGRES_URL = process.env.DATABASE_URL || "postgresql://awamleh:a@localhost:5432/awamleh";
// const POSTGRES_URL = process.env.DATABASE_URL || "postgresql://postgres:1312@localhost:4532/post"

const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}


let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);

const postModel = post(sequelize, DataTypes)
const commentModel = comment(sequelize, DataTypes)
postModel.hasMany(commentModel, { foreignKey: 'ownerID', sourceKey: 'id' })
commentModel.belongsTo(postModel, { foreignKey: 'ownerID', targetKey: 'id' })
module.exports = {
    db: sequelize,
    Post: postModel,
    Comment: commentModel
};
