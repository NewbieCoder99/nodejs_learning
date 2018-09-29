/**
 * Add debugobject when initializing the controller
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Controller.on('initializing', function onInitializing() {

	var target = this,
	    data   = {},
	    bridge,
	    obj;

	if (this._debugObject) {
		target = this._debugObject;
	}

	data.title = 'Initializing controller "' + this.name + '"';
	obj = target.debug({label: 'initializing', data: data});

	if (obj) {
		this.that._debugObject = obj;
		this.conduit._debugController = obj;
		this.conduit.viewRender._debugObject = obj;
	}
});

/**
 * Add filtering mark
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Controller.on('filtering', function onFiltering() {

	if (!this._debugObject) {
		return;
	}

	this._debugObject.mark('filtering');
});

/**
 * Add starting mark
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Controller.on('starting', function onStarting(name) {

	if (!this._debugObject) {
		return;
	}

	this._debugObject.mark('Performing action "' + name + '"');
});

/**
 * Add debugobject when starting to render
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Controller.on('rendering', function onRendering(template) {

	var target = this,
	    data   = {},
	    bridge,
	    obj;

	if (this._debugObject) {
		target = this._debugObject;
	}

	data.title = 'Rendering "' + template + '"';
	obj = target.debug('rendering', data, true);

	if (obj) {
		this.conduit._debugRender = obj;
		this.conduit.viewRender._debugObject = obj;
	}
});

/**
 * Stop timer when response is going to be sent
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Controller.on('responding', function onResponding() {

	if (this.conduit._debugRender) {

		if (this.conduit.viewRender.clientRender) {
			this.conduit._debugRender.title = 'Preparing client-side render of "' + this.conduit.viewRender.mainTemplate + '"';
		}

		this.conduit._debugRender.stop('Rendered');
	}

	if (this._debugObject) {
		this._debugObject.stop('Responding');
	}
});