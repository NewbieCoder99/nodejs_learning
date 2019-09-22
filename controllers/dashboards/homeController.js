const _sess = require('../../libraries/getSession');
const checkSession = require('../../libraries/checkSession');

exports.index = function(req, res, next) {

	checkSession.test(req, res);

	res.render('adminpanel/index', {
		title 	: 'Dashboard admin',
		sess 	: _sess.getSession(req)
	});
}