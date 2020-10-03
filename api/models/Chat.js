const { Schema, model } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const chatSchema = new Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    lastMessageId: { type: String, required: true },
    lastMessageDate: { type: Date, required: true }
})

module.exports = model('Chat', chatSchema);