// Express
const express = require('express');

function register(req, res) {
    console.log(req.body);
}

module.exports = {
    register
}