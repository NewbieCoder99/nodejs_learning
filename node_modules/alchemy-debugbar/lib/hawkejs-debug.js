/**
 * Start mark when preparing render data
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
alchemy.hawkejs.constructor.ViewRender.on('begin', function(templates) {
	if (this._debugObject) {
		this._debugObject.mark('Preparing helpers & variables');
	}
});

/**
 * Preparing has finished, going to execute
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
alchemy.hawkejs.constructor.ViewRender.on('executing', function(templates) {
	if (this._debugObject) {
		this._debugObject.mark(false);
	}
});

/**
 * Preparing has finished, client will handle rendering
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
alchemy.hawkejs.constructor.ViewRender.on('dry_response', function(str) {
	if (this._debugObject) {
		this._debugObject.mark(false, 'Preparing helpers & variables');
	}
});

/**
 * Start mark when getting/compiling template function
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
alchemy.hawkejs.constructor.ViewRender.on('compilingTemplates', function(templates) {
	if (this._debugObject) {
		this._debugObject.mark('Compiling "' + templates + '"');
	}
});

/**
 * End mark when compiled template is ready
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
alchemy.hawkejs.constructor.ViewRender.on('compiledTemplates', function(templates) {
	if (this._debugObject) {
		this._debugObject.mark(false);
	}
});

/**
 * Start mark when beginning template function execution
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
alchemy.hawkejs.constructor.ViewRender.on('executingTemplate', function(name, template) {
	if (this._debugObject) {
		this._debugObject.mark('Executing "' + name + '"');
	}
});

/**
 * Stop mark when template has executed
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
alchemy.hawkejs.constructor.ViewRender.on('executedTemplate', function(name, template) {
	if (this._debugObject) {
		this._debugObject.mark(false);
	}
});

/**
 * Start mark when ViewRender is finishing up
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
alchemy.hawkejs.constructor.ViewRender.on('finishing', function(name, template) {

	var target = this,
	    data,
	    bridge,
	    obj;

	if (!this._debugObject) {
		return;
	}

	data = {};

	if (this._debugObject) {
		target = this._debugObject;
	}

	data.title = 'Finishing render';
	obj = target.debug('finishing_render', data, true);

	if (obj) {
		this.conduit._debugRender = obj;
		this.conduit.viewRender._debugObject = obj;
	}
});

/**
 * End mark when the render is completed
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
alchemy.hawkejs.constructor.ViewRender.on('renderFinished', function(name, template) {
	if (this._debugObject) {
		this._debugObject.stop('Render has finished, blocks have been joined');
	}
});

/**
 * Start mark when ViewRender is finishing a certain block
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
alchemy.hawkejs.constructor.ViewRender.on('finishing_block', function(block_name) {
	if (this._debugObject) {
		this._debugObject.mark('Joining block "' + block_name + '"');
	}
});

/**
 * End mark when the block has been joined
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
alchemy.hawkejs.constructor.ViewRender.on('finished_block', function(block_name) {
	if (this._debugObject) {
		this._debugObject.mark(false, 'Joining block "' + block_name + '"');
	}
});