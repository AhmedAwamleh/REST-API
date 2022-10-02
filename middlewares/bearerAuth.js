'use strict';

const User = require('../models').User;

module.exports = async (req, res, next) => {
  console.log('From inside the middleware');
  if (!req.headers.authorization) (
    next('Youre not authorized')
  )
  console.log(req.headers.authorization)
  const token = req.headers.authorization.split(' ').pop();
  console.log(token)
  try {
    const validUser = User.authenticateToken(token);
    console.log(validUser)
    const userInfo = await User.findOne({ where: { userName: validUser.userName } });
    console.log(userInfo)
    if (userInfo) {
      req.user = userInfo;
      req.token = userInfo.token

      next();
    } else {
      next('Youre not authorized')
    }

  } catch (e) {
    next(e)
  }
}
