const express = require('express');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const ObjectID = require('mongodb').ObjectID;

async function getUserChats(req, res, next) {
    try {
        let chats = await Chat.find({ owner: req.body.id });
        res.status(200).send(chats);
    } catch (err) {
        res.status(500).send('Something goes wrong');
    }
}

async function getUserChatMessages(req, res, next) {
    try {
        let messages = await Message.find({ chatId: req.params.id });
        res.status(200).send({ messages });
    } catch (err) {
        res.status(500).send({ obj: 'obj' });
    }
}

async function deleteAllUsers(req, res, next) {
    let db = req.app.locals.usersCollection;
    db.deleteMany({});
}

async function createChat(req, res, next) {
    // let chat = new Chat({
    //     senderId: '1112232133213122GGG',
    //     receiverId: '1113213213211',
    //     lastMessageId: '2222',
    //     lastMessageDate: new Date(),
    //     owner: '5f78e4762ed85046304e7422'
    // })
    // chat.save();
    // res.send({ chat });
}

async function createMessage(req, res, next) {
    let message = new Message({
        chatId: '5f78e4f91024a5399c173e03',
        body: 'Message body'
    })
    message.save();
    res.send({ message });
}

module.exports = {
    getUserChats,
    getUserChatMessages,
    deleteAllUsers,
    createChat,
    createMessage,
}