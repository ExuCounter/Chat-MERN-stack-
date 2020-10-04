const express = require('express');
const userRouter = express.Router();
const { getUserChats, deleteAllUsers, createChat } = require('../controllers/userController');

userRouter.post('/', getUserChats);
userRouter.get('/create-chat', createChat);
userRouter.get('/delete', deleteAllUsers);

module.exports = userRouter;