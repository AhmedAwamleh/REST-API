'use strict'

const express = require('express');
const { saveUser } = require('../middlewares/userAuth');
const app = express()
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth')
const { signup, users, login } = require('../controllers/userControllers')
app.use(express.json())

router.post('/logIn', login)
router.post('/signUp', saveUser, signup)
router.get('/users', bearerAuth, users)



module.exports = router