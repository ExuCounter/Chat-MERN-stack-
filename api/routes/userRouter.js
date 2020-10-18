const express = require('express');
const userRouter = express.Router();
const { getUserChats, deleteAllData, createChat, getUserChatMessages, createMessage, getChatInfo, getAllUsers, getUsernameById } = require('../controllers/userController');

userRouter.post('/', getUserChats);
userRouter.post('/get-chat-info', getChatInfo)
userRouter.post('/get-all-users', getAllUsers)
userRouter.post('/get-login', async(req, res, next) => {
    const interlocutor = await getUsernameById(req.body.chatId, req.body.userId);
    res.status(200).send({ interlocutor });
});
userRouter.post('/:id', getUserChatMessages);

userRouter.put('/create-chat', createChat);
userRouter.put('/create-message', createMessage);
userRouter.delete('/delete', deleteAllData);
module.exports = userRouter;