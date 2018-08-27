var express 		= require('express'),
	loginController = require('../controllers/api/loginController'),
	logoutController = require('../controllers/api/logoutController'),
	route = express.Router();

route.post('/login', loginController.checkLogin);
route.get('/logout', logoutController.index);
module.exports = route;
