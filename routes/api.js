var express 		= require('express'),
	usersController = require('../controllers/api/usersController'),
	loginController = require('../controllers/api/loginController'),
	logoutController = require('../controllers/api/logoutController'),
	route = express.Router();

route.get('/users', usersController.getAll);
route.post('/login', loginController.checkLogin);
route.get('/logout', logoutController.index);
module.exports = route;
