const express = require('express');

let config = {
    PORT: process.env.PORT || 9000,
    secretKey: 'secret-key'
}

module.exports = config;