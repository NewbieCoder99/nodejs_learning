var express = require('express'),
	homeController = require('../controllers/dashboards/homeController'),
	articlesController = require('../controllers/dashboards/articlesController'),
	usersController = require('../controllers/dashboards/usersController'),
	route = express.Router();

route.get('/', homeController.index);
route.get('/articles', articlesController.index);
route.get('/users', usersController.index);

module.exports = route;
