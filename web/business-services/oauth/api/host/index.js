const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const app = express();

//** SETUP REDIS SESSION STORE **//
require('./services/session')(app);

// declare the passport functionality as a service
require('./services/passport');

// use bodyParser to collect request details from the client
app.use(bodyParser.json());
// return middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(bodyParser.urlencoded({extended:true}));

// tell passport to use cookies for authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/oauthRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
