'use strict'


const Comment = (sequelize, DataTypes) => sequelize.define('Comment', {
    ownerID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        defaultValue: 'comment'
    }
});

module.exports = Comment;