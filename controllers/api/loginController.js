'use strict';

const   md5 	= require('md5'),
		Model 	= require('../../models'),
		Users 	= Model.user,
		Books 	= Model.books;

exports.checkLogin = function(req, res, next) {

	req.check('username','Username is required').notEmpty();
	req.check('password','Password is required').notEmpty();

	var errors = req.validationErrors();

	if(errors == false) {

		var getUser = new Promise(function(resolve) {
			Users.findAll().then(users => resolve(users))
		});

		/* ========== All Promise Sample ========== */
		Promise.all([getUser]).then(function(values) {
		  res.json({users : values[0] } );
		});

	} else {
		res.json({error : 1, message : errors});
	}
}