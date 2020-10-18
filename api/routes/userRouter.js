const express = require('express');
const userRouter = express.Router();
const { getUserChats, deleteAllData, createChat, getUserChatMessages, createMessage, getChatInfo, getAllUsers } = require('../controllers/userController');

userRouter.post('/', getUserChats);
userRouter.post('/get-chat-info', getChatInfo)
userRouter.post('/get-all-users', getAllUsers)
userRouter.post('/:id', getUserChatMessages);

userRouter.put('/create-chat', createChat);
userRouter.put('/create-message', createMessage);
userRouter.delete('/delete', deleteAllData);
module.exports = userRouter;