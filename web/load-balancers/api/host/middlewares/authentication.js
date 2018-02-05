const jsonWebTokens = require('../config/keys').jsonWebTokens;

module.exports = (app) => {
	// Authentication
	app.use((req, res, next) => {
	  /* TODO: 
	  	1. Check if the headers contain a JSON Web token 
	  	2. If user provides correct JSON Web token
	  	3. Allow them to proceed to access api info
	  	4. If either of the first 2 points aren't met, reject the request	
	  */
	  next();
	})
}