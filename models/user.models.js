'use strict';
const jwt = require('jsonwebtoken')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('userTable', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return jwt.sign({
          userName: this.userName
        }, process.env.JWT_SECRET)
      },
      set(tokenObj) {
        return jwt.sign(tokenObj, process.JWT_SECRET)
      }


    }
  });
  User.authenticateToken = token => {

    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return err;
      } else {
        return decoded
      }
    })

  }
  return User;
}

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFsaSIsImlhdCI6MTY2NDMxMDE4MX0.SaO9T1_YabPmdluHarZpEaWfX2S3vSkg0jP1B55TCUo"