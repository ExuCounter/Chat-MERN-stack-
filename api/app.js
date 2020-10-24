// Express and server ( app )
const express = require('express');
const app = express();
// Config
const config = require('./config/config.dev.js');
// Routes
const loginRouter = require('./routes/loginRouter.js');
const registerRouter = require('./routes/registerRouter.js');
const userRouter = require('./routes/userRouter.js');
// Body Parser
const bodyParser = require('body-parser');
// Mongoose
const mongoose = require('mongoose');
// Socket
const io = require('socket.io')();

const url = "mongodb://localhost:27017/";

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect routes
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/chat', userRouter);

// Mongoose Connect 
mongoose.connect(`${config.mongoURL}/chat`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established');
})

// Listen determined port
app.listen(config.PORT, () => {
    console.log(`Server listen port ${config.PORT}`);
})

io.listen(4000);

// Socket connection
io.on('connection', (client) => {
    client.on('message', (message) => {
        console.log('message');
        io.emit('message', message);
    })
})