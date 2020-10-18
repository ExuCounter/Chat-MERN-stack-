const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function getAllUsers(req, res, next) {
    try {
        let users = await User.find({});
        res.status(200).send(users);
    } catch (err) {
        res.status(200).send([]);
    }
}

async function getUserChats(req, res, next) {
    try {
        const chats = await Chat.find({ senderId: req.body.id });
        const updatedChats = [];
        for (let chat of chats) {
            const fetchData = async() => {
                const interlocutor = await getUsernameById(chat._id, req.body.id);
                const {
                    _id,
                    senderId,
                    receiverId,
                    lastMessageId,
                    lastMessageDate,
                } = chat;
                const updatedChat = {
                    _id,
                    senderId,
                    receiverId,
                    lastMessageId,
                    lastMessageDate,
                    interlocutor,
                };
                updatedChats.push(updatedChat);
            };

            await fetchData();
        }

        res.status(200).send(updatedChats);

    } catch (err) {
        res.status(500).send("Something goes wrong");
    }
}

async function getUserChatMessages(req, res, next) {
    try {
        let messages = await Message.find({ chatId: req.params.id });
        res.status(200).send(messages);
    } catch (err) {
        res.status(500).send("No messages yet");
    }
}

async function getChatInfo(req, res, next) {
    try {
        const { id } = req.body;
        let chat = await Chat.find({ _id: id });
        console.log("getChatInfo -> id", id)
        res.status(200).send(chat);
    } catch (err) {
        res.status(500).send("No such chat");
    }
}

async function getUsernameById(chatId, userId) {
    try {
        let chat = await Chat.findOne({ _id: chatId });
        let interlocutor =
            userId == chat.senderId ?
            await User.findOne({ _id: chat.receiverId }) :
            await User.findOne({ _id: chat.senderId });
        return interlocutor.username;
    } catch (err) {
        return null;
    }
}

async function deleteAllData(req, res, next) {
    try {
        const usersDeleted = await User.deleteMany({});
        const chatsDeleted = await Chat.deleteMany({});
        const messagesDeleted = await Message.deleteMany({});
        if (usersDeleted && chatsDeleted && messagesDeleted) {
            console.log("All data deleted");
            res.status(200).send("All data deleted");
        }
    } catch (e) {
        res.status(500).send("Something goes wrong with data clean");
    }
}

async function createChat(req, res, next) {
    const { senderId, receiverId } = req.body;
    let chat = await new Chat({
        senderId,
        receiverId,
        lastMessageId: "",
        lastMessageDate: new Date(),
    });
    chat.save();
    res.send({ chat });
}

async function createMessage(req, res, next) {
    const { chatId, senderId, files, body } = req.body;
    let message = await new Message({
        chatId,
        senderId,
        files,
        body,
    });
    message.save();
    res.send({ message });
    // return message;
}

async function deleteMessage(req, res, next) {
    try {
        const { messageId = id } = req.body;
        await Message.deleteOne({ _id: messageId });
        console.log("Message deleted successfully");
        res.status(200).send("Message deleted successfully, id: " + messageId);
    } catch (error) {
        res.status(500).send("Message delete error " + error);
    }
}

async function editMessage(req, res, next) {
    try {
        let messageId = req.body.id;
        let messageBody = req.body.messageBody;
        await Message.findOneAndUpdate({ _id: messageId }, {
            $set: {
                body: messageBody,
            },
        });
        res.status(200).send("Message updated successfully, id: " + messageId);
    } catch (error) {
        res.status(500).send("Update message error " + error);
    }
}

module.exports = {
    getUserChats,
    getUserChatMessages,
    deleteAllData,
    createChat,
    createMessage,
    getChatInfo,
    getAllUsers,
};