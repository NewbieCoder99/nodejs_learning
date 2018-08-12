const   mysql   = require('mysql'),
	  	config  = require('../config/config.json'),
	  	conn 	= mysql.createConnection(config);

exports.index = function(req, res, next) {
	res.send(req.session.userdata);
}