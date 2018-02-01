const request = require('request');

module.exports = (app) => {	
	
	app.get('/', function(req, res) {  
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
			    	if(body){
					    if(JSON.parse(body)._id) res.render('content', { title : 'Home'});
					    else res.render('login');
			    	} else res.render('login');
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