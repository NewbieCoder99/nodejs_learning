Handlebars = require('express-handlebars'),
exports.index = function(req, res, next) {
	res.render('login/index', { title: 'Login Administrator'});
}