const httpProxy = require('express-http-proxy');

const oauth_api = httpProxy('http://oauth-api:3000');
const accounts_api = httpProxy('http://accounts-api:3000');

module.exports = (app) => {
	app.get(['/auth/google','/auth/google/callback','/auth/google/callback/*','/auth/logout','/auth/current_user'], (req,res, next) => {
		oauth_api(req, res, next);
	});
	
	app.post(['/accounts/find-or-create-user','/accounts/get-user-data'], (req,res, next) => {
	    accounts_api(req, res, next);
	});
}

/*

	upstream accounts_api {
	    server accounts-api:3000;
	}	

	upstream oauth_api {
	    server oauth-api:3000;
	}	

	server {
		listen 80;
		server_name api-gateway;

		location ~ (/auth/google|/auth/google/callback|/auth/logout|/auth/current_user) {
			proxy_pass http://oauth_api;
		}

		location ~ (/accounts/find-or-create-user|/accounts/current_user|/accounts/get-user-data) {
			proxy_pass http://accounts_api;
		}
	}

*/