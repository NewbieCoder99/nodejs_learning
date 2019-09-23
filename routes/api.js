var express 		= require('express'),
	articlesController = require('../controllers/api/articlesController'),
	usersController = require('../controllers/api/usersController'),
	loginController = require('../controllers/api/loginController'),
	logoutController = require('../controllers/api/logoutController'),
	route = express.Router();

route.get('/articles', articlesController.getAll);
route.get('/users', usersController.getAll);
route.post('/login', loginController.checkLogin);
route.get('/logout', logoutController.index);

module.exports = route;
