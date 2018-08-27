exports.index = function(req, res, next) {
	if(req.session.userdata) {
		req.session.userdata = null
	}
	res.json({error : 0, message : 'Logout berhasil.'});
}