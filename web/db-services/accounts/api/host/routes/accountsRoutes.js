const queries = require('../services/db-queries');
const requireGoogleId = require('../middlewares/requireGoogleId');
const requireProfileId = require('../middlewares/requireProfileId');

module.exports = (app) => {

	app.post('/accounts/find-or-create-user', requireGoogleId, (req, res) => {
	    queries.getDataFromOAUTH(req,res);		
	});

	app.post('/accounts/get-user-data', requireProfileId, (req,res) => {
		queries.getDataFromID(req,res);
	})
	
	app.get('*', (req, res) => {
	    res.redirect('/');
	})
}