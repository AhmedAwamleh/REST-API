'use strict'
const express = require('express');
const { signup, allUser } = require('../controllers/userControllers');
const router = express.Router();
const userAuth = require('../middlewares/userAuth')

router.post('/login', (req, res) => {
  res.status(200).send('login')
})
router.get('/users', allUser)
router.post('/signup', userAuth.saveUser, signup)


module.exports = router;