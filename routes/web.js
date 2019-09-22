var express = require('express'),
	homeController = require('../controllers/homeController'),
	staticPageController = require('../controllers/staticPageController'),
	portfolioController = require('../controllers/portfolioController'),
	loginController = require('../controllers/loginController'),
	route = express.Router();

route.get('/', homeController.index);
route.get('/about', staticPageController.about);
route.get('/contact', staticPageController.contact);
route.get('/portfolio', portfolioController.index);
route.get('/login', loginController.index);

module.exports = route;
