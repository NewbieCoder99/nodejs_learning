const   mysql   = require('mysql'),
	  	config  = require('../../config/config.json'),
	  	md5 	= require('md5'),
	  	conn 	= mysql.createConnection(config);

exports.checkLogin = function(req, res, next) {
	req.check('username','Username is required').notEmpty();
	req.check('password','Password is required').notEmpty();
	var errors = req.validationErrors();
	if(errors == false) {
		conn.query('SELECT * FROM user WHERE username="' + req.body.username + '"',
		function(err, result, fields) {
			if(err) {
				res.json(err);
			} else
			{
				if(result.length == 1) {
					if(result[0].password == md5(req.body.password))
					{
						var sess = req.session;
						sess.userdata = result[0];
						res.json({error : 0, message : 'Login berhasil.'});
					} else
					{
						res.json({error : 1, message : 'Password salah.'});
					}
				} else
				{
					res.json({error : 1, message : 'User tidak ditemukan.'});
				}
			}
		});
	} else
	{
		res.json({error : 1, message : errors});
	}
}