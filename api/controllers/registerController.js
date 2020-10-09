// Express
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Chat = require('../models/Chat');

async function register(req, res) {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const candidate = await User.findOne({ username });
        if (candidate) {
            console.log(candidate);
            res.status(400).send('Such user already exists');
        } else {
            const user = new User({ username, password: hashedPassword });
            user.save();
            res.status(200).send(user);
        }
    } catch (e) {
        res.status(500).send('Something went wrong with registration. Please try again');
    }
}

module.exports = {
    register
}