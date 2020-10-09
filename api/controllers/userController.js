const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function getUserChats(req, res, next) {
    try {
        let chats = await Chat.find({ senderId: req.body.id });
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

async function getUsernameById(req, res, next) {
    try {
        let user = await User.findOne({ _id: req.body.id });
        res.status(200).send({ username: user.username });
    } catch (err) {
        res.status(500).send('No such chat');
    }
}

async function deleteAllData(req, res, next) {
    try {
        // const usersDeteled = await User.deleteMany({});
        const messagesDeleted = await Message.deleteMany({});
        if (messagesDeleted) {
            console.log('All data deleted');
            res.status(200).send('All data deleted');
        }
    } catch (e) {
        res.status(500).send('Something goes wrong with data clean')
    }
}

async function createChat(req, res, next, id) {
    let chat = await new Chat({
        senderId: '5f7e1fce0efde220947b6246',
        receiverId: '5f7e1fce0efde220947b6246',
        lastMessageId: '2222',
        lastMessageDate: new Date(),
        owner: id
    })
    chat.save();
    // res.send({ chat });
    return chat;
}

async function createMessage(req, res, next) {
    const { chatId, senderId, files, body } = req.body;
    let message = await new Message({
        chatId,
        senderId,
        files,
        body
    })
    message.save();
    res.send({ message });
    // return message;
}

async function createDummyData(req, res, next) {
    try {
        let id = '5f7e1fce0efde220947b6246';
        for (let i = 0; i < 2; i++) {
            let chat = await createChat(req, res, next, id);
            for (let i = 0; i < Math.random() * 5; i++) {
                createMessage(req, res, next, chat._id);
            }
        }
        console.log('Dummy data created successfully');
        res.status(200).send('Dummy data created successfully');
    } catch (error) {
        res.status(500).send('Dummy data create error: ' + error);
        console.log(error);
    }
}

async function deleteMessage(req, res, next) {
    try {
        let messageId = req.body.id;
        await Message.deleteOne({ _id: messageId });
        console.log('Message deleted successfully');
        res.status(200).send('Message deleted successfully, id: ' + messageId);
    } catch (error) {
        res.status(500).send('Message delete error ' + error);
    }
}

async function editMessage(req, res, next) {
    try {
        let messageId = req.body.id;
        let messageBody = req.body.messageBody;
        await Message.findOneAndUpdate({ _id: messageId }, {
            $set: {
                body: messageBody
            }
        })
        res.status(200).send('Message updated successfully, id: ' + messageId);
    } catch (error) {
        res.status(500).send('Update message error ' + error);
    }
}

module.exports = {
    getUserChats,
    getUserChatMessages,
    deleteAllData,
    createChat,
    createMessage,
    createDummyData,
    getUsernameById
}