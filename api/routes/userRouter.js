const express = require('express');
const userRouter = express.Router();
const { getUserChats, deleteAllData, createChat, getUserChatMessages, createMessage, createDummyData, getUsernameById } = require('../controllers/userController');

userRouter.post('/', getUserChats);
userRouter.post('/:id', getUserChatMessages);
userRouter.put('/user/get-login-by-id', getUsernameById);

userRouter.get('/create-chat', createChat);
userRouter.get('/delete', deleteAllData);
userRouter.get('/create-message', createMessage);
userRouter.get('/create-dummy-data', createDummyData);

module.exports = userRouter;