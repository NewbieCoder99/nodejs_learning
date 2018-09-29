// Enable classWideEvents for these classes
Model.setStaticProperty('classWideEvents', true);
Controller.setStaticProperty('classWideEvents', true);
alchemy.hawkejs.constructor.ViewRender.setStaticProperty('classWideEvents', true);

// Add the debugbar script
alchemy.hawkejs.on({type: 'viewrender', status: 'begin'}, function onBegin(viewRender) {

	var debugbarData,
	    conduit = viewRender.conduit;

	// If there is no conduit, it's probably some kind of sub-render
	if (!conduit) {
		return;
	}

	// Add the debugbar javascript files
	viewRender.script([

		// Require a package named "jquery",
		// use the supplied path if it isn't loaded yet
		{name: 'jquery', path: 'debugbar/jquery-2.2.4.min.js'},

		// Load the main debugbar scripts
		'debugbar/debugbar_panel',
		'debugbar/core'
	]);

	// Add the debugbar stylesheets
	viewRender.style('debugbar/core');

	// Prepare an object containing all the data
	// debugbar will use
	debugbarData = {
		body      : conduit.body,
		cookies   : conduit.cookies,
		files     : conduit.files,
		headers   : conduit.headers,
		lag       : alchemy.toobusy.lag(),
		languages : conduit.languages,
		route     : conduit.route,
		session   : conduit.session(),
		toobusy   : alchemy.toobusy(),
		url       : conduit.url
	};

	viewRender.internal('debugbarData', debugbarData);
});
