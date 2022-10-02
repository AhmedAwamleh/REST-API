'use strict'

const bcrypt = require('bcrypt')
const base64 = require('base-64')
const { User } = require('../models/index')
const signup = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    console.log(req.body)
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
      role
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
  console.log(req.headers.authorization);
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


const allUser = async (req, res) => {
  // console.log(req.user.capabilities)
  const users = await User.findAll();
  res.json(users);
}


module.exports = {
  signup,
  allUser,
  login,
}