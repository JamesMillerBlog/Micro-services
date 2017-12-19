
module.exports = (app) => {	
	app.get('/', function(req, res) {    
		// sess.email=req.body.email;
		if(!req.user) {
		    res.render('content', { title : 'Home'} )
		    // TO DO: render all gallery images from all users
		}
		// else render this users gallery images
	});
}