'use strict';

const   md5 = require('md5'),
		fs = require('fs'),
		db = require('../../config/database');

exports.checkLogin = function(req, res, next) {
	req.check('username','Username is required').notEmpty();
	req.check('password','Password is required').notEmpty();
	var errors = req.validationErrors();
	if(errors == false) {

		db.sync().then(() => {
			console.log('Connection has been established successfully.');
		}).catch(err => {
			console.error('Unable to connect to the database:', err);
		});

	} else
	{
		res.json({error : 1, message : errors});
	}
}