const request = require('request');

module.exports = (app) => {	
	
	app.get('/admin', function(req, res) {
		var options = {
	    	'url':'http://localhost/api/current_user',
			'proxy':'http://services-load-balancer',
			headers: {
				'Cookie': req.headers.cookie
			}
	    }
	    request(
	    	options,
			function (error, response, body) {
			    if (!error) {
			    	// console.log("body");
				    if(body){ 
				    	res.render('admin', {
					        account: JSON.parse(body)
					    });
				    }
				    else res.redirect('/');
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

