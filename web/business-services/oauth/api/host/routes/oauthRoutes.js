const passport = require('passport');
const request = require('request');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
	// when user comes to this route
	// use passport to authenticate with 'google' (google string == google strategy within the passport library)
	// the arguements are an array containing profile and email
	// these are the two pieces of information we are requesting from google
	app.get(
		'/auth/google', 
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);
	
	// once the user has allowed the app to access profile and email details
	// pass the authentication code from google into passport
	app.get(
		'/auth/google/callback', 
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/admin');
		}
	);
	
	app.get('/auth/logout', (req,res) => {
		req.logout();
		res.redirect('/');
	});

	app.get(
		'/auth/current_user', requireLogin,
		(req, res) => {
		var options = {
			'method': 'POST',
	    	'url':'http://accounts-api:3000/accounts/get-user-data',
			// 'proxy':'http://http-load-balancer',
			form: {
				profileID: req.user
			}
	    }
	    request(
	    	options,
			function (error, response, body) {
			    if (!error) {
			    	// return user data from the account service
			    	// based on deserialized cookie from passport
					res.send(body);
			    }
			    if (error) {
			    	// console.log("error");
			    	// console.log(error);
			    }
			}
		);
	});
	
	app.get('*', (req, res) => {
	    res.redirect('/');
	})
}

