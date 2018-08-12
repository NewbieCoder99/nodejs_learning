const   mysql   = require('mysql'),
	  	config  = require('../../config/config.json'),
	  	md5 	= require('md5'),
	  	conn 	= mysql.createConnection(config);

exports.checkLogin = function(req, res, next) {
	req.check('username','Username is required').notEmpty();
	req.check('password','Password is required').notEmpty();
	res.send(req.validationErrors());
}