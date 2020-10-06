const { Schema, model, Types } = require('mongoose');
const objectId = require('mongodb').ObjectID;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
    versionKey: false
})

module.exports = model('User', userSchema);