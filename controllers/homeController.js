exports.index = function(req, res, next) {
	return res.render('home', {
		title : "Home"
	});
}