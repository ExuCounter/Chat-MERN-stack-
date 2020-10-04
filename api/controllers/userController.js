const express = require('express');
const Chat = require('../models/Chat');
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
        let messages = await Chat.find({ owner: req.body.chatId });
        res.status(200).send({ messages });
    } catch (err) {
        res.status(500).send('Something goes wrong');
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

module.exports = {
    getUserChats: getUserChats,
    deleteAllUsers: deleteAllUsers,
    createChat: createChat
}