const request = require('request');

module.exports = (app) => {	
	
	app.get('/admin', function(req, res) {
		console.log("CHECK LOG IN!?");
		var options = {
	    	'url':'http://localhost/auth/current_user',
			'proxy':'http://http-load-balancer',
			headers: {
				'Cookie': req.headers.cookie
			}
	    }
	    request(
	    	options,
			function (error, response, body) {
				console.log("happening?");
			    if (!error) {
			    	console.log("body");
			    	console.log(body);
			    	// if cookies exist
				    if(body){ 
				    	console.log("ADMIN TRYING TO LOAD!!");
				    	console.log(JSON.parse(body));
				    	//then the user must have an active session
				    	// res.render('admin');
				    	res.render('admin', {
					        account: JSON.parse(body)
					    });
					// else redirect to home page
				    } else res.redirect('/');
			    }
			    if (error) {
			    	// console.log("error");
			    	// console.log(error);
			    }
			}
		);
	});

	// app.get('*', (req, res) => {
	//     res.redirect('/');
	// })
}

