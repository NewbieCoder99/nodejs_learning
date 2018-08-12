exports.index = function(req, res, next) {
	res.render('index', { title: 'Login User' });
}