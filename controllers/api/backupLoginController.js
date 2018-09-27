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

		var promise1 = new Promise(function(resolve) {
			Users.findAll().then(users => resolve(users))
		});

		var promise2 = new Promise(function(resolve) {
			Books.findAll().then(books => resolve(books) )
		});

		/* ========== Promise 1 & 2 Sample ========== */
		// promise1.then(function(users) { 
		// 	promise2.then(function(books) { 
		// 	  res.json( { users: users, books : books });
		// 	});
		// });

		/* ========== All Promise Sample ========== */
		Promise.all([promise1, promise2]).then(function(values) {
		  res.json({users : values[0], books : values[1] } );
		})

	} else {
		res.json({error : 1, message : errors});
	}
}