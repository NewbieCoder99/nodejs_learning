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
	res.render('adminpanel/articles/index', {
		title 	: 'Articles',
		sess 	: _sess.getSession(req)
	});

}

exports.create = function(req, res, next) {

	/*
	* Check Session
	*/
	checkSession.test(req, res);

	/*
	* Render View
	*/
	res.render('adminpanel/articles/create', {
		title 	: 'Create Article',
		sess 	: _sess.getSession(req)
	});

}