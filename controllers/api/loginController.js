'use strict';

const 	crypto 	= require('crypto'),
      	dotenv 	= require('dotenv').config(),
		model 	= require('../../models'),
		secret 	= process.env.PASSWORD_SECRET;

exports.checkLogin = function(req, res, next) {

	req.check('username','Username is required').notEmpty();
	req.check('password','Password is required').notEmpty();

	var errors = req.validationErrors();

	if(errors == false) {

		var getUser = new Promise(function(resolve) {
			model.User.findOne({
				where: {
					username : req.body.username,
					password : crypto.createHmac('sha256', secret)
							   .update(req.body.password).digest('hex'),
				},
				include : [
					{ 
						model : model.Role_users,
						include : [{
							model : model.Roles
						}]
					}
				]
			}).then(callBack => resolve(callBack))
		});

		getUser.then(function(callBack) {

			req.session.userdata = JSON.stringify(callBack);

			if(callBack == null) {
				res.json({
					error  : 1,
					message : ["User tidak ditemukan."],
					result : null
				});
			} else {
				res.json({
					error  	: 0,
					message : "Login berhasil.",
					result 	: req.session.userdata
				});
			}
		});

	} else {
		res.json({error : 1, message : errors});
	}
}