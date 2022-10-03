'use strict'

const Comment = (sequelize, DataTypes) => sequelize.define('CommentsTable', {
    postID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        defaultValue: 'comment'
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Comment;
