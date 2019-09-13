var express = require('express'),
	homeController = require('../controllers/homeController'),
	staticPageController = require('../controllers/staticPageController'),
	portfolioController = require('../controllers/portfolioController'),
	loginController = require('../controllers/loginController'),
	dashboardController = require('../controllers/dashboardController'),
	route = express.Router();

route.get('/', homeController.index);
route.get('/about', staticPageController.about);
route.get('/contact', staticPageController.contact);
route.get('/portfolio', portfolioController.index);
route.get('/login', loginController.index);
route.get('/dashboard', dashboardController.index);

module.exports = route;
