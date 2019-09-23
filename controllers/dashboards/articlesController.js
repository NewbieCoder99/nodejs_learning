const _sess = require('../../libraries/getSession');
const checkSession = require('../../libraries/checkSession');

exports.index = function(req, res, next) {

	/*
	* Check Session
	*/
	checkSession.test(req, res);

	/*
	* Render View
	*/
	res.render('adminpanel/articles/index', {
		title 	: 'Dashboard admin',
		sess 	: _sess.getSession(req)
	});

}