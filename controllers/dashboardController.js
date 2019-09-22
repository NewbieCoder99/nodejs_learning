const _sess = require('../libraries/getSession');

exports.index = function(req, res, next) {
	if(req.session.userdata != null) {
		res.render('adminpanel/index', {
			title 	: 'Dashboard admin',
			sess 	: _sess.getSession(req)
		});
	} else {
		res.redirect('/');
	}
}