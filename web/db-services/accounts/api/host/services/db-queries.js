const mongoose = require('mongoose');
const redis = require("redis");
const User = mongoose.model('users');

module.exports = {

	// Search user details in db
		// If user exists write db 

		/*
			REDIS CACHE GOES HERE!?
			1. Search redis db
			2. If nothing exists then query mongo
				- If it does exist in mongo then save it to Redis
			3. If it does exist then return that data
		*/ 

		// redis.get(title, function (err, reply) {
	 //        if (err) callback(null);
	        // else if (reply) //Book exists in cache
	        // callback(JSON.parse(reply));
	    	// return JSON.parse(reply);
	        // else {
	            //Book doesn't exist in cache - we need to query the main database
	            // do mongo call here
	            // then save returned data to redis
                // redis.set(title, JSON.stringify(doc), function () {
                //     callback(doc);
                // });
	                
	    //     }
	    // });

	findUser(req, res) {
		User.findOne({ googleId: req.body.googleId})
			.then(existingUser => {
				if(existingUser) {
					//we already have a record with the given profile id
					// once saved, check its there and return it in the done function.
					// first arguement, was there an error (in this case null)
					// second arguement, the user that was found
					// console.log("SUCCESS! Already have user");
					res.send(existingUser);
				} else {
					// we don't have a user record with this id, create a new record
					// console.log("SUCCESS! Create user!");
					new User({ googleId: req.body.googleId, googleName: req.body.googleName }).save().then(user => done(null, user));
					// 'user' represents the item that has just been created in mongo
				}
			});
	},

	/*
		REDIS CACHE GOES HERE!?
	*/ 

	getUserData(req,res) {
		User.findById(req.body.profileID).then( user => { 
			res.send(user); 
		})
	}
};