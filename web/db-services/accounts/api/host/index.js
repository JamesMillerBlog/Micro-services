const express = require("express");
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();

// declare the mongo schema
require('./models/User');

//** SETUP MONGO DB **//
mongoose.connect(keys.mongoURI);

//** SETUP REDIS CACHE **//
require('./services/cache')(app);

//** SETUP MIDDLEWARES **//
require('./middlewares/bodyparser')(app);

//** SETUP API **//
require('./routes/accountsRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
