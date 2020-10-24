const express = require('express');

let config = {
    PORT: process.env.PORT || 9000,
    mongoURL: 'mongodb://localhost:27017',
    secretKey: 'secret-key'
}

module.exports = config;