// Express and server ( app )
const express = require('express');
const app = express();
// Config
const config = require('./config/config.dev.js');
// Routes
const loginRouter = require('./routes/loginRouter.js');
const registerRouter = require('./routes/registerRouter.js');
// Body Parser
const bodyParser = require('body-parser');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect routes
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// Listen determined port
app.listen(config.PORT, () => {
    console.log(`Server listen port ${config.PORT}`);
})