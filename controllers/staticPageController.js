exports.about = function(req, res, next) {
	return res.render('about', {
		title : 'About Me',
		segment : 'about'
	});
}

exports.contact = function(req, res, next) {
	return res.render('contact', {
		title : 'Contact Me',
		segment : 'contact'
	});
}
