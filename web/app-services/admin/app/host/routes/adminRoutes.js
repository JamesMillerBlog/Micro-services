const request = require('request');

module.exports = (app) => {	
	
	app.get('/admin', function(req, res) {
		var options = {
	    	'url':'http://oauth-api:3000/auth/current_user',
			// 'proxy':'http://http-load-balancer',
			headers: {
				'Cookie': req.headers.cookie
			}
	    }
	    request(
	    	options,
			function (error, response, body) {
			    if (!error) {
			    	// if cookies exist
			    	if(body){
			    		// if '_id' exists within the cookie then
					    if(JSON.parse(body)._id){ 
					    	//then the user must have an active session
					    	res.render('admin', {
						        account: body
						    });
						// if '_id' doesn't exist then redirect to home page
					    } else res.redirect('/');
					// if cookie doesn't exist then redirect to home page
			    	} else res.redirect('/');
			    }
			    if (error) {
			    	// console.log("error");
			    	// console.log(error);
			    }
			}
		);
	});
}

