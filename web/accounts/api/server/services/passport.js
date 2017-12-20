const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// passport.serializeUser((user, done) => {
// 	done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
// 	User.findById(id)
// 	.then( user => {
// 		done(null, user);
// 	});
// });

passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: 'http://localhost/auth/google/callback'
		// proxy: true
	}, 
	accessToken => {
		console.log(accessToken);
	})
	// async (accessToken, refreshToken, profile, done) => {
	// 	// console.log('access token ',accessToken);
	// 	// console.log('refresh token ',refreshToken);
	// 	// console.log('profile ',profile);
	// 	const existingUser = await User.findOne({ googleId: profile.id })
	// 		// we already have a record with the given profile ID
	// 		if(existingUser) return done(null, existingUser);
	// 		// no user records exists with provided details, create one in the db and creates new model instance
	// 		const user = await new User({ googleId: profile.id }).save() // save it
	// 		done(null, user); // once saved, check its there and return it in the done function.
	// })
);