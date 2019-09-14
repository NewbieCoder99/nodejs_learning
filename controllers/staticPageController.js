var http = require("http");
var request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const _string = require('../libraries/cutString');

exports.about = function(req, res, next) {

	request.get({
		url: 'https://www.upwork.com/fl/qudratnurfajarys',
		headers: {
			'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:69.0) Gecko/20100101 Firefox/69.0',
			'Content-Type' : 'application/x-www-form-urlencoded' 
		}
	}, function (e, r, body) {

		const dom = new JSDOM(body);
		var _title = _string.cutString(
				body.toString(),'"title":"','","'
			),
			_description = _string.cutString(
				body.toString(),'itemprop="description">','</p>'
			);

		return res.render('about', {
			title : 'About Me',
			segment : 'about',
			_title : _title,
			_description : _description.toString()
		});
	});

}

exports.contact = function(req, res, next) {
	return res.render('contact', {
		title : 'Contact Me',
		segment : 'contact'
	});
}