'use strict'

const Comment = (sequelize, DataTypes) => sequelize.define('CommentsTable', {
    ownerID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        defaultValue: 'comment'
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Comment;
