module.exports = (app) => {	
	
	app.get('/', function(req, res) {    
	    res.render('content', { title : 'Home'} )
	});

	app.get('*', (req, res) => {
	    res.redirect('/');
	})
}