'use strict';

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
	res.render('adminpanel/users/index', {
		title : 'Dashboard | Users',
		sess : _sess.getSession(req)
	});

}