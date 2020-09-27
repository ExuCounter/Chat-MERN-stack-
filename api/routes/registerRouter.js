// Express
const express = require('express');
// Register Router
const registerRouter = express.Router();
// Register Controller
const registerController = require('./../controllers/registerController');

registerRouter.post('/', registerController.register);

module.exports = registerRouter;