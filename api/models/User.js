const { Schema, model } = require('mongoose');
const objectId = require('mongodb').ObjectID;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

module.exports = model('User', userSchema);