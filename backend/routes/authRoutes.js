const express = require('express');
const { login, signUp } = require('../controllers/authController');

const authRouter = express.Router();

//login
authRouter.post('/login',login);

//sign up
authRouter.post('/signup', signUp)


module.exports = { authRouter }