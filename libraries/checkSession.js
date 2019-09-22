exports.test = function(req, res) {
	if(req.session.userdata == null) {
		res.redirect('/');
	}
}