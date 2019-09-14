var HTMLParser = require('node-html-parser');
var http = require("http");
var request = require('request');

exports.about = function(req, res, next) {

	request.get({
		url: 'https://www.upwork.com/fl/qudratnurfajarys',
		headers: {
			'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:69.0) Gecko/20100101 Firefox/69.0',
			'Content-Type' : 'application/x-www-form-urlencoded' 
		}
	}, function (e, r, body) {
		console.log(body)
		return res.render('about', {
			title : 'About Me',
			segment : 'about'
		});
	});

}

exports.contact = function(req, res, next) {
	return res.render('contact', {
		title : 'Contact Me',
		segment : 'contact'
	});
}
