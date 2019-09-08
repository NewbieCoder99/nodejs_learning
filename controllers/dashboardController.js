exports.index = function(req, res, next) {
	if(req.session.userdata != null) {
		res.render('adminpanel/index', {
			title 	: 'Dashboard admin',
			sess 	: JSON.parse(req.session.userdata)
		});
	} else {
		res.redirect('/');
	}
}