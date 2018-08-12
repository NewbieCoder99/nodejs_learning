var express 		= require('express'),
	loginController = require('../controllers/loginController'),
	route 			= express.Router();

/* GET home page. */
route.get('/', loginController.index);

module.exports = route;
