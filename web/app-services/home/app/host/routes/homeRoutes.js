module.exports = (app) => {	
	
	app.get('/', function(req, res) {  
		//Make a request for a user with a given ID
	    res.render('content', { title : 'Home'} )
	});

	// app.get('*', (req, res) => {
	//     res.redirect('/');
	// })
}