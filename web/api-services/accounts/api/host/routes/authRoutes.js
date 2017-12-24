const passport = require('passport');

module.exports = (app) => {
	// when user comes to this route
	// use passport to authenticate with 'google' (google string == google strategy within the passport library)
	// the arguements are an array containing profile and email
	// these are the two pieces of information we are requesting from google
	app.get(
		'/auth/google', 
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);
	
	// once the user has allowed the app to access profile and email details
	// pass the authentication code from google into passport
	app.get(
		'/auth/google/callback', 
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/admin');
		}
	);
	
	app.get('/api/logout', (req,res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
	
	app.get('*', (req, res) => {
	    res.redirect('/');
	})
}

