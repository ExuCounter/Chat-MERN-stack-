// Express
const express = require('express');
const loginRouter = express.Router();
// Login Controller
const loginController = require('./../controllers/loginController');

loginRouter.get('/', loginController.main);

module.exports = loginRouter;