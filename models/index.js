'use strict'
const { Sequelize, DataTypes } = require('sequelize');
const post = require('./post.model');
const POSTGRES_URL = process.env.DATABASE_URL || "postgresql://awamleh:a@localhost:5432/awamleh";


const sequelizeOption = {
    dialectOption: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}


let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);



module.exports = {
    db: sequelize,
    Post: post(sequelize, DataTypes)
};