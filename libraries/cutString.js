exports.cutString = function(html, start, end) {
	var explode1 = html.split(start);
	var explode2 = explode1[1].split(end);
	return explode2[0];
}