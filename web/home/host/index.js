//** SET UP ALL VARIABLES **//
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const keys = require('./config/keys');

const bodyParser = require('body-parser');
const redis = require("redis");
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient(keys.redisPort, 'redis');

//** SERVE PUG FILES **//
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// initialize the session
// secret is used for cookie handling
app.use(session({
	secret: keys.sessionSecret,
	store: new redisStore({ host: 'redis', port: keys.redisPort, client: client,ttl :  260}),
	resave: false,
    saveUninitialized: false
}));

// use bodyParser to collect request details from the client
app.use(bodyParser.json());
// return middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(bodyParser.urlencoded({extended:true}));

//** SERVE ASSETS **//
app.use(express.static(__dirname + '/../client/dist/public'));

//** SETUP SOCKETS **//
require('./sockets/setup')(io);

//** SET HOME ROUTE **//
require('./routes/homeRoutes')(app);

http.listen(process.env.PORT || 3000);