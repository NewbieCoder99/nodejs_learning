exports.index = function(req, res, next) {
	res.send(req.session.userdata);
}