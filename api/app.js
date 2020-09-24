// Express and server ( app )
const express = require('express');
const app = express();
// Config
const config = require('./config/config.dev.js');

// Listen determined port
app.listen(config.PORT, () => {
    console.log(`Server listen port ${config.PORT}`);
})