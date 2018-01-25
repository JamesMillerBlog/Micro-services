const redis = require("redis");
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const keys = require('./../config/keys');
const client  = redis.createClient(keys.redisPort,keys.redisHost);
client.auth(keys.redisPW);

module.exports = (app) => {

	// initialize the session
	// secret is used for cookie handling
	app.use(session({
		secret: keys.sessionSecret,
		store: new redisStore({ host: keys.redisHost, port: keys.redisPort, client: client, ttl:  keys.redisTTL }),
		resave: false,
	    saveUninitialized: false
	}));
}