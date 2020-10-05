const express = require('express');
const userRouter = express.Router();
const { getUserChats, deleteAllUsers, createChat, getUserChatMessages, createMessage } = require('../controllers/userController');

userRouter.post('/', getUserChats);
userRouter.get('/create-chat', createChat);
userRouter.get('/delete', deleteAllUsers);
userRouter.get('/create-message', createMessage);
userRouter.post('/:id', getUserChatMessages);

module.exports = userRouter;