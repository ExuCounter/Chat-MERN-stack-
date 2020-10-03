const express = require('express');
const ObjectID = require('mongodb').ObjectID;

async function getUserChats(req, res, next) {
    let db = req.app.locals.usersCollection;
    console.log(req.body.id);
    let user = await db.findOne({ _id: ObjectID(req.body.id) });
    res.send({ chats: user });
}

module.exports = {
    getUserChats: getUserChats
}