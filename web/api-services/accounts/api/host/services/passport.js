const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// once the user has been created / found
passport.serializeUser((user, done) => {
	// return the user's id
	// users id is created automatically by mongo for each record
	// console.log("SERIALIZE USER ID");
	// console.log(user.id);
	done(null, user.id);
	// this will be used for signing into the app once the user has signed in the first time from a browser
});

// once the users id is returned from the browser / session
// deserialise the id
passport.deserializeUser((id, done) => {
	// console.log("DESERIALIZE USER ID");
	// search the id of the user in the mongo db
	User.findById(id)
	// return the users account that is associated with that id
	.then( user => {
		done(null, user);
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
		User.findOne({ googleId: profile.id})
			.then(existingUser => {
				if(existingUser) {
					//we already have a record with the given profile id
					// console.log("user exists");
					// once saved, check its there and return it in the done function.
					// first arguement, was there an error (in this case null)
					// second arguement, the user that was found
					done(null, existingUser);
				} else {
					// console.log("user DOESN'T exists");
					// we don't have a user record with this id, create a new record
					new User({ googleId: profile.id, googleName: profile.displayName }).save()
					// once the item has been saved, tell passport that saving the new user is done
					// 'user' represents the item that has just been created in mongo
					.then(user => done(null, user));
				}
			});
	})
);