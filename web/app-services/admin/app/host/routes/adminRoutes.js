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
					    if(JSON.parse(body)._id){ 
					    	//then the user must have an active session
					    	res.render('admin', {
						        account: body
						    });
						// else redirect to home page
					    } else res.redirect('/');
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

