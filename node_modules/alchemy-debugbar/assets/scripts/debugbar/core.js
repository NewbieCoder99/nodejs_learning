/**
 * The Debugbar class
 *
 * @constructor
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
var Debugbar = Function.inherits('Informer', function Debugbar() {

	// Create the tabs deck
	this.tabs = this.constructor.tabs;

	// See if the debugbar element is already present
	this.wrapper = document.getElementById('debugbar');

	// If not, create it and append it to the body
	if (!this.wrapper) {
		this.wrapper = Blast.parseHTML('<div id="debugbar" class="minimized"></div>');
		document.body.appendChild(this.wrapper);
	}

	// The array with previous request data
	this.history = [];

	this.$wrapper = $(this.wrapper);

	this.makeButtonsClickable();
	this.makePanelDraggable();
});

Debugbar.prepareStaticProperty(function tabs() {
	return new Deck();
});

/**
 * Walk over an object
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 * 
 * @param    {Object}   obj
 * @param    {Number}   level
 * @param    {Array}    seen
 *
 * @return   {String}
 */
Debugbar.setStatic(function walk(obj, level, seen) {

	var html = '<div class="debugkit-var-obj',
	    temp;

	if (!level) {
		level = 0;
	}

	// Don't go over 100 levels deep
	if (level > 100) {
		return '';
	}

	if (!seen) {
		seen = [window];
	}

	if (level) {
		html += ' debugkit-var-nested';
	}

	html += '">';

	if (obj && typeof obj == 'object') {
		seen.push(obj);
	}

	Object.each(obj, function eachEntry(value, key) {

		var do_walk,
		    sub = '',
		    name,
		    type = typeof value;

		if (value === undefined) {
			name = 'undefined';
		} else if (value == null) {
			name = 'null';
			type = 'null';
		} else {
			name = value.constructor.name;
		}

		name = String(name);

		html += '<div class="debugkit-var-entry debugkit-var-type-' + name.toLowerCase();

		if (type == 'object') {
			html += ' debugkit-var-has-children"><div class="debugkit-var-header"><span class="debugkit-var-handle">&#9658</span>';
		} else {
			html += '"><div class="debugkit-var-header">';
		}

		html += '<span class="debugkit-var-key">' + key + '</span>';

		if (value && typeof value == 'object') {

			if (seen.indexOf(value) == -1) {

				if (key == 'prototype') {
					html += '<span class="debugkit-var-value">prototype</span>';
				} else {
					try {

						if (value && typeof value.toDebugbar == 'function') {
							value = value.toDebugbar();
						}

						if (Array.isArray(value)) {
							temp = 'Array';
							do_walk = true;
						} else if (__Protoblast.Bound.Object.isPlainObject(value)) {
							temp = '' + value;

							if (temp.indexOf('[object ') > -1) {
								temp = 'Object';
							}

							do_walk = true;
						} else {
							do_walk = false;
						}

						if (do_walk) {
							html += '<span class="debugkit-var-value">' + temp + '</span>';

							if (!(value instanceof HTMLElement)) {
								sub += walk(value, level+1, seen);
							}
						} else {
							temp = '...';
							html += '<span class="debugkit-var-value">' + temp + '</span>';
						}
					} catch (err) {
						html += '<span class="debugkit-var-value">[ERR: ' + err + ']</span>';
					}
				}
			} else {
				html += '<span class="debugkit-var-value">[circular]</span>';
			}
		} else {
			html += '<span class="debugkit-var-value">' + value + '</span>';
		}

		html += '<span class="debugkit-var-type">' + name + '</span></div>';

		if (sub) {
			html += sub;
		}

		html += '</div>';
	});

	html += '</div>';

	return html;
});

/**
 * Register a tab
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 *
 * @param    {String}   name    Name of the tab (and the view file)
 * @param    {Function} prefnc  Function to handle the data before rendering
 * @param    {Function} postfnc Function to handle the element after render
 * @param    {Number}   weight
 */
Debugbar.setStatic(function register(name, prefnc, postfnc, weight) {
	var panel = new DebugbarPanel(name);

	if (typeof prefnc == 'function') {
		panel.prefnc = prefnc;
	} else {
		panel.prefnc = function dummy(debuglog, variables, next) {next(null)};
	}

	if (typeof postfnc == 'function') {
		panel.postfnc = postfnc;
	} else {
		panel.postfnc = Function.dummy;
	}

	panel.title = name;

	this.tabs.set(name, panel, weight);
});

/**
 * Update the debugbar with data from the server
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
Debugbar.setMethod(function update(debuglog, variables, data) {

	var that = this,
	    tasks = [];

	// Store it in the history
	this.history.push({
		debuglog: debuglog,
		variables: variables,
		data: data
	});

	this.tabs.forEach(function eachTab(tab, name, index) {
		tasks.push(function generate(next) {
			tab.prefnc(debuglog, variables, function doneData() {
				var vars = Object.assign({}, variables, {debuglog: debuglog});

				hawkejs.render('debugbar/' + name + '_panel', vars, function done(err, lines) {

					var html;

					if (err) {
						next(err);
					}

					html = lines.join('');

					next(null, {title: tab.title, content: html});
				});
			});
		});
	});

	Function.parallel(tasks, function done(err, results) {

		if (err) {
			return console.error('Error rendering debugbar: ' + err);
		}

		hawkejs.render('debugbar/core', {tabs: results}, function rendered(err, lines) {
			that.$wrapper.html(lines.join(''));

			that.tabs.forEach(function eachTab(tab) {
				if (tab.postfnc) {
					tab.postfnc(that.$wrapper, debuglog, variables, data);
				}
			});
		});
	});
});

/**
 * Make buttons clickable
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
Debugbar.setMethod(function makeButtonsClickable() {

	var that = this,
	    $wrapper = this.$wrapper;

	// Toggle the bar
	$wrapper.on('click', '.panel-tab.icon', function onClick(e) {
		$wrapper.toggleClass('minimized');
	});

	// Toggle the panel buttons
	$wrapper.on('click', '.toggler .panel-tab-title', function onClick(e) {

		var $this = $(this),
		    $content = $this.siblings('.panel-content');

		// Hide all other panels
		$('.panel-content').hide();

		// Show our panel
		$content.show();
	});
});

/**
 * Make the pannel draggable
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
Debugbar.setMethod(function makePanelDraggable() {

	// Create a variable in the enclosing scope, for scope tricks.
	var currentElement = null;

	// Use the elements startHeight stored Event.pageY and current Event.pageY to
	// resize the panel.
	var mouseMoveHandler = function (event) {
		event.preventDefault();
		if (!currentElement) {
			return;
		}
		var newHeight = currentElement.data('startHeight') + (event.pageY - currentElement.data('startY'));
		currentElement.parent().height(newHeight);
	};

	// Handle the mouseup event, remove the other listeners so the panel
	// doesn't continue to resize.
	var mouseUpHandler = function (event) {
		currentElement = null;
		$(document).off('mousemove', mouseMoveHandler).off('mouseup', mouseUpHandler);
	};

	var mouseDownHandler = function (event) {
		event.preventDefault();

		currentElement = $(this);
		currentElement.data('startY', event.pageY);
		currentElement.data('startHeight', currentElement.parent().height());

		// Attach to document so mouse doesn't have to stay precisely on the 'handle'.
		$(document).on('mousemove', mouseMoveHandler)
			.on('mouseup', mouseUpHandler);
	};

	this.$wrapper.on('mousedown', '.panel-resize-handle', mouseDownHandler);
});

/**
 * Listen for renders to end
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
hawkejs.scene.on('rendered', function rendered(variables, data) {

	var debuglog = variables.__debuglog;

	if (!debuglog) {
		return;
	}

	alchemy.debugbar.update(debuglog, variables, data);
});

/**
 * Show graphical representation of how long certain pieces of code took
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
Debugbar.register('timer', function timer(debuglog, variables, callback) {

	var end = 0;

	// Determine the final end time
	debuglog.forEach(function eachLog(log) {
		if (log.end > end) {
			end = log.end;
		}
	});

	// Calculate the pixel percentages
	debuglog.forEach(function eachLog(log) {
		log.pixelBegin = ((log.start / end) * 100).toFixed(2);
		log.pixelEnd = 100 - ((log.end / end) * 100).toFixed(2);

		// Make sure every log has a visual representation, even if they're really short
		if (log.pixelBegin + log.pixelEnd > 99) {
			log.pixelEnd -= 0.1;
		}

		if (log.children) {
			log.children.forEach(eachLog);
		}
	});

	callback(null);
});

/**
 * Show the session content
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
Debugbar.register('session', null, function sessionContent($wrapper, debuglog, variables, data) {

	var $content = $wrapper.find('.session-content');

	html = '<h2>Session variables</h2>';
	html += Debugbar.walk(variables.__debugbarData.session);

	// Put the HTML into the body
	$content.html(html);

	// Toggle the children entries on click
	$content.on('click', '.debugkit-var-has-children .debugkit-var-header', function(e) {
		e.stopPropagation();
		$(this).parent().find('> .debugkit-var-nested').toggle();
	});
});

/**
 * Show the request content
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
Debugbar.register('request', null, function requestContent($wrapper, debuglog, variables, data) {

	var $content = $wrapper.find('.request-content'),
	    data = variables.__debugbarData;

	html = '<h2>Post data</h2>';
	html += Debugbar.walk(data.body);

	html += '<h2>Query string</h2>';
	html += Debugbar.walk(data.url.query);

	html += '<h2>Cookies</h2>';
	html += Debugbar.walk(data.cookies);

	html += '<h2>Headers</h2>';
	html += Debugbar.walk(data.headers);

	html += '<h2>Route</h2>';
	html += Debugbar.walk(data.route);

	// Put the HTML into the body
	$content.html(html);

	// Toggle the children entries on click
	$content.on('click', '.debugkit-var-has-children .debugkit-var-header', function(e) {
		e.stopPropagation();
		$(this).parent().find('> .debugkit-var-nested').toggle();
	});
});

/**
 * Show all the available variables to the view during render
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.2.0
 */
Debugbar.register('variables', null, function variablesContent($wrapper, debuglog, variables, data) {

	var $content = $wrapper.find('.variables-content'),
	    internal = {},
	    main     = {},
	    html,
	    seen,
	    key;

	for (key in variables) {
		if (key.slice(0, 2) == '__') {
			internal[key.slice(2)] = variables[key];
		} else {
			main[key] = variables[key];
		}
	}

	html = '<h2>Set view variables</h2>';
	html += Debugbar.walk(main);

	html += '<h2>Internal view variables</h2>';
	html += Debugbar.walk(internal);

	html += '<h2>Exposed view variables</h2>';
	html += Debugbar.walk(data.exposeToScene);

	// Put the HTML into the body
	$content.html(html);

	// Toggle the children entries on click
	$content.on('click', '.debugkit-var-has-children .debugkit-var-header', function onClick(e) {
		e.stopPropagation();
		$(this).parent().find('> .debugkit-var-nested').toggle();
	});
});

// Create the debugbar instance
alchemy.debugbar = new Debugbar();
