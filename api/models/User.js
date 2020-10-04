const { Schema, model, Types } = require('mongoose');
const objectId = require('mongodb').ObjectID;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }]
})

module.exports = model('User', userSchema);