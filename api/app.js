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
// Mongo DB
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect routes
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// Mongo DB Connect
mongoClient.connect((err, client) => {
    if (err) return console.error(err);
    app.locals.usersCollection = client.db('chat').collection('users');
    app.locals.usersCollection.find().toArray((err, collection) => {
        if (err) return console.error(err);
        console.log(collection)
    })
})

// Listen determined port
app.listen(config.PORT, () => {
    console.log(`Server listen port ${config.PORT}`);
})