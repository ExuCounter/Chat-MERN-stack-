const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
        res.status(200).send(messages);
    } catch (err) {
        res.status(500).send('No such chat');
    }
}

async function deleteAllData(req, res, next) {
    try {
        const usersDeteled = await User.deleteMany({});
        const chatsDeleted = await Chat.deleteMany({});
        const messagesDeleted = await Message.deleteMany({});
        if (usersDeteled && chatsDeleted && messagesDeleted) {
            console.log('All data deleted');
            res.status(200).send('All data deleted');
        }
    } catch (e) {
        res.status(500).send('Something goes wrong with data clean')
    }
}

async function createChat(req, res, next, id) {
    let chat = await new Chat({
        senderId: '1112232133213122GGG',
        receiverId: '1113213213211',
        lastMessageId: '2222',
        lastMessageDate: new Date(),
        owner: id
    })
    chat.save();
    // res.send({ chat });
    return chat;
}

async function createMessage(req, res, next, id) {
    let hashedMessage = await bcrypt.hash("Message", 4);
    let message = await new Message({
        chatId: id,
        body: 'Message body ' + hashedMessage
    })
    message.save();
    // res.send({ message });
    return message;
}

async function createDummyData(req, res, next) {
    try {
        let id = '5f7c38fb0f63be2234a2776e';
        for (let i = 0; i < 5; i++) {
            let chat = await createChat(req, res, next, id);
            for (let i = 0; i < Math.random() * 15; i++) {
                createMessage(req, res, next, chat._id);
            }
        }
        res.status(200).send('Dummy data created successfully');
    } catch (error) {
        res.status(500).send('Dummy data create error: ' + error);
        console.log(error);
    }
}

module.exports = {
    getUserChats,
    getUserChatMessages,
    deleteAllData,
    createChat,
    createMessage,
    createDummyData
}