'use strict';

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
		var	_data = _string.cutString(body.toString(),'var phpVars = ','};');
		var _dataToJson = JSON.parse(_data + '}');
		return res.render('about', {
			title : 'About Me',
			segment : 'about',
			_assignments : _dataToJson.profileSettings.profile.assignments,
			_dataToJson : _dataToJson
		});

	});

}

exports.contact = function(req, res, next) {
	return res.render('contact', {
		title : 'Contact Me',
		segment : 'contact'
	});
}
