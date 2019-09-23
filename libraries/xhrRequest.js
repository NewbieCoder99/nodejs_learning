exports.test = function(req, res) {
	if(req.session.userdata == null) {
		if(!req.xhr) {
			return res.json({
				error : 1,
				message : 'XHR Request is required.'
			});
		}
	}
}