exports.getSession = function(req) {
	return JSON.parse(req.session.userdata);
}