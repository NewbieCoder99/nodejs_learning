exports.index = function(req, res, next) {
	if(req.session.userdata != null) {
		res.render('dashboard', { title: 'Dashboard admin', sess : req.session.userdata });
	} else {
		res.redirect('/');
	}
}