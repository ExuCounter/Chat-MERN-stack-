const { Schema, model, Types } = require('mongoose');

const chatSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: 'User' },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User' },
    lastMessageId: { type: String },
    lastMessageDate: { type: Date },
    versionKey: false
})

module.exports = model('Chat', chatSchema);