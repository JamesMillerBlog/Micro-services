const passport = require('passport');
const request = require('request');

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
			console.log("SEND BACK TO ADMIN");
			console.log(req.body);
			res.redirect('/admin');
		}
	);
	
	app.get('/auth/logout', (req,res) => {
		req.logout();
		res.redirect('/');
	});

	app.get(
		'/auth/current_user',
		(req, res) => {
		var options = {
			'method': 'POST',
	    	'url':'http://localhost/accounts/get-user-data',
			'proxy':'http://http-load-balancer',
			form: {
				profileID: req.user
			}
	    }
	    request(
	    	options,
			function (error, response, body) {
			    if (!error) {
			    	console.log("body");
			    	console.log(body);
					res.send(body);
		        	// req user based on cookie data
		        	// !!!!!
		        	// not returning anything
		        	// needs to return a USER!!
			    }
			    if (error) {
			    	// console.log("error");
			    	// console.log(error);
			    }
			}
		);
	// 	// include cookies with this request
 //    	console.log("COOKIE");
 //    	console.log(cookie);
	// 	res.send(cookie);
	// 	// console.log(req.session);
	// 	// console.log("auth req headers");
	// 	// console.log(req.headers);
	});
	
	app.get('*', (req, res) => {
	    res.redirect('/');
	})
}

