const request = require('request');

module.exports = () => {	

	request.post({
		'url':'http://localhost/api/test',
		'proxy':'http://http-load-balancer',
		form: {
			test: "lol",
			two: "lolol"
		}
	},
	function (error, response, body) {
	    if (!error) {
	    	console.log("body home app");
	        console.log(body);
	        // console.log("response");
	        // console.log(response);
	    }
	    if (error) {
	    	console.log("error");
	    	console.log(error);
	    }
	});
}