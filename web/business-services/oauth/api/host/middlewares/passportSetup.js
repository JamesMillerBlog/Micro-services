const bodyParser = require('body-parser');
const passport = require('passport');

module.exports = (app) => {
	// use bodyParser to collect request details from the client
	app.use(bodyParser.json());
	// return middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
	app.use(bodyParser.urlencoded({extended:true}));
	// tell passport to use cookies for authentication
	app.use(passport.initialize());
	app.use(passport.session());
}