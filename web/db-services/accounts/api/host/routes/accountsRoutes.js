const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');


module.exports = (app) => {

	app.post('/accounts/find-user', (req, res) => {
		// console.log("WORKING lol!?");
		// console.log(req.session);
		// console.log("auth req headers");
		console.log("acc api req");
		console.log(req.body);
		// Search user details in db
		// If user exists write db 
		User.findOne({ googleId: req.body.googleId})
		.then(existingUser => {
			if(existingUser) {
				//we already have a record with the given profile id
				// console.log("user exists");
				// once saved, check its there and return it in the done function.
				// first arguement, was there an error (in this case null)
				// second arguement, the user that was found
				// done(null, existingUser);
				console.log("SUCCESS! Already have user");
				res.send(existingUser);
			} else {
				// console.log("user DOESN'T exists");
				// we don't have a user record with this id, create a new record
				console.log("SUCCESS! Create user!");
				new User({ googleId: req.body.googleId, googleName: req.body.googleName }).save().then(user => done(null, user));
				// once the item has been saved, tell passport that saving the new user is done
				// 'user' represents the item that has just been created in mongo
			}
		});
		
		
	});

	app.post('/accounts/get-user-data', (req,res) => {
		User.findById(req.body.profileID).then( user => { 
			res.send(user); 
		})
	})
	
	app.get('*', (req, res) => {
	    res.redirect('/');
	})
}

