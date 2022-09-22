'use strict'

const { UserModel } = require("../models/index");
module.exports = async (req, res, next) => {
  console.log('From inside the middleware');
  if (!req.headers.authorization) (
    next(' not authorized!!!')
  )

  const token = req.headers.authorization.split(' ').pop();
  console.log(token)
  const validUser = await UserModel.authenticateToken(token)
  try {
    const userInfo = await UserModel.findOne({
      where: { username: validUser.username }

    });
    if (userInfo) {
      req.user = userInfo,
        req.token = userInfo.token
      next();
    } else {
      next('not authorized');
    }
    console.log(userInfo)

  } catch (error) {
    next(error)
  }

}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFobWVkIiwiaWF0IjoxNjYzNzk5MDUxfQ.ZiR47HgMAQOmJwzH-CKkDQ-3ZCelakC7B7lbKQ4KQvk