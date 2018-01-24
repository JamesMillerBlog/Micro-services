const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const app = express();

// declare the mongo schema
require('./models/User');

//** SETUP REDIS SESSION STORE **//
require('./services/session')(app);

//** SETUP MONGO DB **//
mongoose.connect(keys.mongoURI);

// declare the passport functionality as a service
require('./services/passport');

// tell passport to use cookies for authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/accountsRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
