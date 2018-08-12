var express 		= require('express'),
	loginController = require('../controllers/api/loginController'),
	route 			= express.Router();

route.post('/login', loginController.checkLogin);

module.exports = route;
