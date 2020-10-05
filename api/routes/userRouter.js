const express = require('express');
const userRouter = express.Router();
const { getUserChats, deleteAllUsers, createChat, getUserChatMessages, createMessage } = require('../controllers/userController');

userRouter.post('/', getUserChats);
userRouter.post('/:id', getUserChatMessages);

userRouter.get('/create-chat', createChat);
userRouter.get('/delete', deleteAllUsers);
userRouter.get('/create-message', createMessage);

module.exports = userRouter;