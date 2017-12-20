const redis = require("redis");
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const keys = require('./../../config/keys');
const client  = redis.createClient(keys.redisPort, 'redis');
const bodyParser = require('body-parser');

module.exports = (app) => {

	// initialize the session
	// secret is used for cookie handling
	app.use(session({
		secret: keys.sessionSecret,
		store: new redisStore({ host: keys.redisHost, port: keys.redisPort, client: client,ttl :  260}),
		resave: false,
	    saveUninitialized: false
	}));

	// use bodyParser to collect request details from the client
	app.use(bodyParser.json());
	// return middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
	app.use(bodyParser.urlencoded({extended:true}));

}