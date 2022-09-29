'use strict'
const User = require('../models').User
const bcrypt = require('bcrypt')
const base64 = require('base-64')

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10)
    };
    const user = await User.create(data);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const basicHeader = req.headers.authorization.split(' ');
  console.log(basicHeader);
  const encodedValue = basicHeader.pop();
  const decodedValue = base64.decode(encodedValue);
  const [userName, password] = decodedValue.split(':');
  const user = await User.findOne({
    where: {
      userName: userName
    }
  });
  if (user) {
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      return res.status(200).send(user);
    } else {
      return res.status(401).send('You are not authorized');
    }
  } else {
    return res.status(401).send('You are not authorized');
  }
};


const users = async (req, res) => {
  const users = await User.findAll()
  res.status(200).json(users)
}

module.exports = {
  signup,
  users,
  login
}