var express = require('express'),
	homeController = require('../controllers/homeController'),
	staticPageController = require('../controllers/staticPageController'),
	loginController = require('../controllers/loginController'),
	dashboardController = require('../controllers/dashboardController'),
	route = express.Router();

route.get('/', homeController.index);
route.get('/about', staticPageController.about);
route.get('/contact', staticPageController.contact);
route.get('/portfolio', homeController.index);
route.get('/login', loginController.index);
route.get('/dashboard', dashboardController.index);

module.exports = route;
