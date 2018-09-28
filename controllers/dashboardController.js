exports.index = function(req, res, next) {
	if(req.session.userdata != null) {
		res.render('adminpanel/adminpanel_index', {
			title 	: 'Dashboard admin',
			sess 	: req.session.userdata
		});
	} else {
		res.redirect('/');
	}
}