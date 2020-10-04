const { Schema, model, Types } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const chatSchema = new Schema({
    senderId: { type: String },
    receiverId: { type: String },
    lastMessageId: { type: String },
    lastMessageDate: { type: Date },
    owner: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Chat', chatSchema);