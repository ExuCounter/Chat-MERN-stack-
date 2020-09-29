// Express
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            let result = await bcrypt.compare(password, user.password);
            if (result) {
                console.log('Logged In');
            }
        } else {
            console.log('User do not exist ( Incorrect email )');
        }
        res.send({ email, password });
    } catch (err) {
        res.status(400).send(err);
    }
}

module.exports = {
    login
};