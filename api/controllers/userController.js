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
        const { id } = req.body;
        const chats = await Chat.find({ senderId: id });
        const updatedChats = [];
        for (let chat of chats) {
            const fetchData = async() => {
                const {
                    _id,
                    senderId,
                    receiverId,
                    lastMessageId,
                    lastMessageDate,
                } = chat;
                const interlocutor = await getUsernameById(_id, id);
                const lastMessage = await getMessageBodyById(lastMessageId);
                const updatedChat = {
                    _id,
                    senderId,
                    receiverId,
                    lastMessage,
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
        const messages = await Message.find({ chatId: req.params.id });
        res.status(200).send(messages);
    } catch (err) {
        res.status(500).send("No messages yet");
    }
}

async function getChatInfo(req, res, next) {
    try {
        const { id } = req.body;
        const chat = await Chat.find({ _id: id });
        console.log("getChatInfo -> id", id)
        res.status(200).send(chat);
    } catch (err) {
        res.status(500).send("No such chat");
    }
}

async function getUsernameById(chatId, userId) {
    try {
        const chat = await Chat.findOne({ _id: chatId });
        const interlocutor =
            userId == chat.senderId ?
            await User.findOne({ _id: chat.receiverId }) :
            await User.findOne({ _id: chat.senderId });
        return interlocutor.username;
    } catch (err) {
        return null;
    }
}

async function getMessageBodyById(messageId) {
    try {
        const message = await Message.findOne({ _id: messageId });
        return message.body;
    } catch (error) {
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
    const chat = await Chat.findOneAndUpdate({ _id: chatId }, {
        $set: {
            lastMessageId: message._id
        }
    });
    message.save();
    chat.save();
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
    getUsernameById
};