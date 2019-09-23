'use strict';

exports.index = function(req, res, next) {

	if(req.session.userdata) {
		req.session.userdata = null
	}

	if(req.xhr == true) {
		return res.json({
			error : 0,
			message : 'Logout successfull.'
		});
	}

	return res.redirect("/");
}