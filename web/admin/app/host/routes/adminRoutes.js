
module.exports = (app) => {	
	app.get('/admin', function(req, res) {    
		// sess.email=req.body.email;
	    res.render('admin')
	    // TO DO: render all gallery images from all users
		
		// else render this users gallery images
	});

	app.get('*', (req, res) => {
	    res.redirect('/');
	})
}