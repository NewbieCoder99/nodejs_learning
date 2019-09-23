'use strict';

const 	crypto 	= require('crypto'),
		model 	= require('../../models'),
		secret 	= process.env.PASSWORD_SECRET;

exports.checkLogin = function(req, res, next) {

	req.check('email','Email is required').notEmpty();
	req.check('password','Password is required').notEmpty();

	var errors = req.validationErrors();

	if(errors == false) {

		var getUser = new Promise(function(resolve) {
			model.User.findOne({
				where: {
					email : req.body.email,
					password : crypto.createHmac('sha256', secret).update(req.body.password).digest('hex'),
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

			if(callBack == null) {
				res.json({
					error  : true,
					message : ["User tidak ditemukan."],
					result : null
				});
			} else {
				req.session.userdata = JSON.stringify(callBack);
				res.json({
					error  	: false,
					message : "Login berhasil.",
					result 	: req.session.userdata
				});
			}
		});

	} else {
		res.json({error : 1, message : errors});
	}
}