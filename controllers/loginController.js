'use strict';

exports.index = function(req, res, next) {

	if(req.session.userdata == null) {
		return res.render('login/index', { title : "Login Administrator"} );
	}

	return res.redirect('/dashboard');
}