const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const redis = require('redis');
const client  = redis.createClient(keys.redisPort,keys.redisHost);
client.auth(keys.redisPW);

module.exports = {
	//** SEARCH CACHE FOR USER DATA FROM OAUTH DETAILS **//
	getDataFromOAUTH(req, res) {
		client.get(JSON.stringify(req.body.googleId), (err, existingUser) => {
	        if (err) console.log(err);
	        // user exists, return this data as response
	        else if (existingUser) {
	        	res.send(JSON.parse(existingUser));
	        }
	        // user doesn't exist in cache - query mongo
	        else module.exports.oauthDataReturn(req,res);
	    });
	},
	//** SEARCH CACHE FOR USER DATA FROM USER ID **//
	getDataFromID(req, res) {
		client.get(JSON.stringify(req.body.profileID), (err, existingUser) => {
	        if (err) console.log(err);
	        // user exists, return this data as response
	        else if (existingUser) res.send(JSON.parse(existingUser));
	        // user doesn't exist in cache - query mongo
	        else module.exports.idDataReturn(req,res);
	    });
	},
	//** SEARCH DB FOR USER DATA FROM OAUTH **//
	oauthDataReturn(req, res) {
		User.findOne({ googleId: req.body.googleId})
		.then(existingUser => {
			if(existingUser) {
				//we already have a record with the given profile id, once saved, check its there and return it in the done function. First arguement, was there an error (in this case null), second arguement, the user that was found
				client.set(JSON.stringify(req.body.googleId), JSON.stringify(existingUser), () => {
	                module.exports.getDataFromOAUTH(req,res);
	            });
			} else {
				// we don't have a user record with this id, create a new record //console.log("SUCCESS! Create user!");
				new User({ googleId: req.body.googleId, googleName: req.body.googleName }).save().then(user => {
	                // console.log("User not exist in DB, save to cache and rerun the oauthdb");
	                client.set(JSON.stringify(req.body.googleId), user, () => {
	                    module.exports.getDataFromOAUTH(req,res);
	                });
				}); 
			}
		});
	},
	//** SEARCH DB FOR USER DATA FROM USER ID **//
	idDataReturn(req,res) {
		User.findById(req.body.profileID).then( user => { 
			client.set(JSON.stringify(req.body.profileID), JSON.stringify(user), () => {
                module.exports.getDataFromID(req,res);
            });
		})
	}
};