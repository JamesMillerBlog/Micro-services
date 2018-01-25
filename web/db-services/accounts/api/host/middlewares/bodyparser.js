const bodyParser = require('body-parser');

module.exports = (app) => {
	// use bodyParser to collect request details from the client
	app.use( bodyParser.json() );
	// return middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
	app.use(bodyParser.urlencoded({ extended: true }));
}