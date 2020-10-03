const express = require('express');
const userRouter = express.Router();
const { getUserChats } = require('../controllers/userController');

userRouter.post('/', getUserChats);

module.exports = userRouter;