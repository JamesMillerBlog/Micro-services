const request = require('request');

module.exports = () => {	

	request({
	'url':'http://localhost',
	'path': '/api/current_user',
	'proxy':'http://nginx'
	},
	function (error, response, body) {
	    if (!error) {
	    	console.log("body");
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