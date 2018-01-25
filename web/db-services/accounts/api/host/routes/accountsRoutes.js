const queries = require('../services/db-queries');

module.exports = (app) => {

	app.post('/accounts/find-or-create-user', (req, res) => {
	    queries.findUser(req,res);		
	});

	app.post('/accounts/get-user-data', (req,res) => {
		queries.getUserData(req,res);
	})
	
	app.get('*', (req, res) => {
	    res.redirect('/');
	})
}