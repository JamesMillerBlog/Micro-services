module.exports = (req, res, next) => {
	if(!req.body.googleId) {
		return res.status(401).send({ error: 'You must provide valid google id!' });
	}
	next();
};