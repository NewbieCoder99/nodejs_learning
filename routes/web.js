var express 		= require('express'),
	loginController = require('../controllers/loginController'),
	dashboardController = require('../controllers/dashboardController'),
	route 			= express.Router();

/* GET home page. */
route.get('/', loginController.index);

route.get('/dashboard', dashboardController.index);

module.exports = route;
