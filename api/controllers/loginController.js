// Express
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config.dev');
const User = require('../models/User');

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user) {
            let result = await bcrypt.compare(password, user.password);
            if (result) {
                let token = jwt.sign({ id: 'id' }, config.secretKey, { expiresIn: '1h' });
                res.status(200).send({ token, userId: user._id });
            } else {
                res.status(400).send('No such user or incorrect data');
            }
        }

    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = {
    login
};