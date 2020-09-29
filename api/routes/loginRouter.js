// Express
const express = require('express');
const loginRouter = express.Router();
// Login Controller
const loginController = require('./../controllers/loginController');

loginRouter.post('/', loginController.login);

module.exports = loginRouter;