const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('../config/keys');
const request = require('request');

// once the user has been created / found
passport.serializeUser((body, done) => {
	// return the user's id
	// users id is created automatically by mongo for each record
	// console.log("SERIALIZE USER ID & store in session");
	// console.log(body);
	let user = JSON.parse(body);
	// console.log("user = " + user);
	done(null, user._id);
	// this will be used for signing into the app once the user has signed in the first time from a browser
});

// once the users id is returned from the browser / session
// deserialise the id
passport.deserializeUser((id, done) => {
	// console.log("DESERIALIZE USER ID");
	// console.log(id);
	// search the id of the user in the mongo db
	// return the users account that is associated with that id

	request({
    	'method': 'POST',
		'url':'http://localhost/accounts/get-user-data',
		'proxy':'http://http-load-balancer',
		form: {
			profileID: id
		}
	},
	function (error, response, body) {
	    if (!error) {
	    	// console.log("return from accounts mongo");
	     //    console.log(JSON.parse(body)._id); // return id
	        done(null, JSON.parse(body)._id);
	    }
	    if (error) {
	    	// console.log("error");
	    	// console.log(error);
	    }
	});
});

passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: keys.googleRedirectURI
		// proxy: true 
	}, 
	(accessToken, refreshToken, profile, done) => {
		// console.log('access token '+accessToken);
		// console.log('refreshToken '+refreshToken);
		// console.log('profile ');
		// console.log(profile);
		//check mongo to search through the users schema and find a google id that == profile id
		request({
	    	'method': 'POST',
			'url':'http://localhost/accounts/find-or-create-user',
			'proxy':'http://http-load-balancer',
			form: {
				googleId: profile.id,
				googleName: profile.displayName
			}
		},
		(error, response, body) => {
		    if (!error) {
		        done(null, body);
		    }
		    if (error) {
		    	console.log("error");
		    	console.log(error);
		    }
		});
	})
);