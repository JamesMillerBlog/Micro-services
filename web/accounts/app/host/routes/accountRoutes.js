
module.exports = (app) => {	
	app.get('/signin', function(req, res) {    
		// sess.email=req.body.email;
		if(!req.user) {
		    res.render('signin')
		    // TO DO: render all gallery images from all users
		}
		// else render this users gallery images
	});

	app.get('*', (req, res) => {
	    res.redirect('/');
	})
}