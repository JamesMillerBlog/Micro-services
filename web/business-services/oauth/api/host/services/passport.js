const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('../config/keys');
const request = require('request');
var cookie = require('../services/cookie');

// once the user has been created / found
passport.serializeUser((body, done) => {
	// return the user's id
	// users id is created automatically by mongo for each record
	console.log("SERIALIZE USER ID & store in session");
	console.log(body);
	let user = JSON.parse(body);
	console.log("user = " + user);
	done(null, user._id);
	// this will be used for signing into the app once the user has signed in the first time from a browser
});

// once the users id is returned from the browser / session
// deserialise the id
passport.deserializeUser((id, done) => {
	console.log("DESERIALIZE USER ID");
	console.log(id);
	// search the id of the user in the mongo db
	// return the users account that is associated with that id
	// console.log("SUCCESS (what to do now?!)");

	request({
    	'method': 'POST',
		'url':'http://localhost/accounts/get-user-data',
		'proxy':'http://http-load-balancer',
		// headers: { 
		// 	'Cookie': cookie
		// },
		form: {
			profileID: id
		}
	},
	function (error, response, body) {
	    if (!error) {
	    	console.log("return from accounts mongo");
	        console.log(JSON.parse(body)._id); // return id
	        done(null, JSON.parse(body)._id);
	    }
	    if (error) {
	    	console.log("error");
	    	console.log(error);
	    }
	});

	console.log("DESERIALIZE SUCCESS?");
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
			'url':'http://localhost/accounts/find-user',
			'proxy':'http://http-load-balancer',
			// headers: { 
			// 	'Cookie': cookie
			// },
			form: {
				googleId: profile.id,
				googleName: profile.displayName
			}
		},
		function (error, response, body) {
		    if (!error) {
		    	console.log("body home app");
		        console.log(body);
		        console.log("COOKIE");
		        console.log(cookie);
		        done(null, body);
		        // console.log("response");
		        // console.log(response);
		    }
		    if (error) {
		    	console.log("error");
		    	console.log(error);
		    }
		});
		console.log("SUCCESS!");
		// User.findOne({ googleId: profile.id})
		// 	.then(existingUser => {
		// 		if(existingUser) {
		// 			//we already have a record with the given profile id
		// 			// console.log("user exists");
		// 			// once saved, check its there and return it in the done function.
		// 			// first arguement, was there an error (in this case null)
		// 			// second arguement, the user that was found
		// 			done(null, existingUser);
		// 		} else {
		// 			// console.log("user DOESN'T exists");
		// 			// we don't have a user record with this id, create a new record
		// 			console.log("SUCCESS!");
		// 			new User({ googleId: profile.id, googleName: profile.displayName }).save().then(user => done(null, user));
		// 			// once the item has been saved, tell passport that saving the new user is done
		// 			// 'user' represents the item that has just been created in mongo
		// 		}
		// 	});
	})
);