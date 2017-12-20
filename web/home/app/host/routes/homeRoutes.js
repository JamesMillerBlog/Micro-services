
module.exports = (app) => {	
	app.get('/', function(req, res) {    
		if(!req.user) {
		    res.render('content', { title : 'Home'} )
		    // TO DO: render all gallery images from all users
		}
		// else render this users gallery images
	});

	app.get('*', (req, res) => {
	    res.redirect('/');
	})
}