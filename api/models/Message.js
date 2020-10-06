const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    chatId: { type: String, required: true },
    body: { type: String, required: true },
    versionKey: false
})

module.exports = model('Message', messageSchema);