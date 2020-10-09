const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat' },
    senderId: { type: Schema.Types.ObjectId, ref: 'User' },
    files: { type: Schema.Types.Array },
    body: { type: String, required: true },
    versionKey: false
})

module.exports = model('Message', messageSchema);