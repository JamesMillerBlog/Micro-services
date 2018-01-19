const request = require('request');

module.exports = (app) => {	
	
	app.get('/', function(req, res) {  
	    var options = {
	    	'url':'http://localhost/api/current_user',
			'proxy':'http://http-load-balancer',
			headers: {
				'Cookie': req.headers.cookie
			}
	    }
	    request(
	    	options,
			function (error, response, body) {
			    if (!error) {
			    	// console.log("body");
			     //    console.log(body);
				    if(body) res.render('content', { title : 'Home'});
				    else res.render('login');
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