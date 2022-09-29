

'use strict';

const Post = (sequelize, DataTypes) => sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        defaultValue: 'hello'
    },


});

module.exports = Post;