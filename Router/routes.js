const express = require('express')
const Router = express.Router();
const {signUp, signIn, getDashboard, verifyEmail } = require('../Controller/authController')
const {authMiddleware} = require('../Middleware/authMiddleware')

Router.post('/sign-up', signUp)
Router.post('/sign-in', signIn)
Router.post('/verify-email', verifyEmail);
Router.get('/dashboard',authMiddleware, getDashboard)

module.exports = Router;