const express = require('express');
const userRouter = express.Router();
const { getUserChats, deleteAllData, createChat, getUserChatMessages, createMessage, createDummyData, getUsernameById } = require('../controllers/userController');

userRouter.post('/', getUserChats);
userRouter.post('/:id', getUserChatMessages);
userRouter.put('/user/get-login-by-id', getUsernameById);

userRouter.put('/create-chat', createChat);
userRouter.put('/create-message', createMessage);
userRouter.get('/delete', deleteAllData);
userRouter.get('/create-dummy-data', createDummyData);

module.exports = userRouter;