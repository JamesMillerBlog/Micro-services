const request = require('request');

module.exports = (app) => {	
	
	app.get('/admin', function(req, res) {
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
			    if (!error) {
			    	// if cookies exist
				    if(body){ 
				    	//then the user must have an active session
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

