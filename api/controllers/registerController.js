// Express
const express = require('express');

function register(req, res) {
    console.log("Body + " + req.body.email);
    res.send({
        email: req.body.email,
        password: req.body.password
    })
}

module.exports = {
    register
}