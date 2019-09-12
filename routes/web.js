var express = require('express'),
	homeController = require('../controllers/homeController'),
	loginController = require('../controllers/loginController'),
	dashboardController = require('../controllers/dashboardController'),
	route = express.Router();

/* GET home page. */
route.get('/', homeController.index);
route.get('/login', loginController.index);
route.get('/dashboard', dashboardController.index);

module.exports = route;
