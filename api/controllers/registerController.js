// Express
const express = require('express');
const shortid = require('shortid');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');

async function register(req, res) {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword });
        user.save();
        res.send({
            email: req.body.email,
            password: req.body.password
        })
    } catch (e) {
        res.status(500).send('Something went wrong with registration. Please try again');
    }
}

module.exports = {
    register
}