/**
 * Add debugobject when finding
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Model.on('finding', function onFinding(options) {

	var target = this,
	    data   = {},
	    obj;

	if (options._debugObject) {
		target = options._debugObject;
	}

	// Store the find options
	data.findOptions = options;

	// And the model info
	data.modelName = this.name;

	// Title to show
	data.title = 'Querying "' + this.name + '"';

	obj = target.debug({label: 'find', data: data});

	if (obj) {
		options._debugObject = obj;
	}
});

/**
 * Datasource is being read
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Model.on('reading_datasource', function onReading(dbQuery) {
	if (dbQuery.options._debugObject) {
		dbQuery.options._debugObject.mark('Querying datasource ' + dbQuery.model.name);
	}
});

/**
 * Query is done, now add associated data mark
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Model.on('read_datasource', function onRead(dbQuery) {
	if (dbQuery.options._debugObject) {
		dbQuery.options._debugObject.mark(false);
	}
});

/**
 * Going to fetch items from cache
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Model.on('fetching_cache', function onCache(options) {
	if (this._debugObject) {
		this._debugObject.mark('Fetched ' + this.name + ' items from cache');
	}
});

/**
 * Items were fetched from cache
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Model.on('fetched_cache', function onCache(options, items) {
	if (this._debugObject) {
		this._debugObject.mark(false);
	}
});

/**
 * Going to store items in the cache
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Model.on('storing_cache', function onStoringCache(options, items) {
	if (this._debugObject) {
		this._debugObject.mark('Storing ' + items.length + ' ' + this.name + ' results in cache');
	}
});

/**
 * Stored items in the cache
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Model.on('stored_cache', function onStoredCache(options, items) {
	if (this._debugObject) {
		this._debugObject.mark(false);
	}
});

/**
 * Query is done, now add associated data mark
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Model.on('queried', function onQueried(options, items) {
	if (options._debugObject) {
		options._debugObject.mark('Adding associated data');
	}
});

/**
 * Associated data has been added, now do afterfind
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Model.on('associated', function onAssociated(options, items) {
	if (options._debugObject) {
		options._debugObject.mark('Executing afterfind');
	}
});

/**
 * Stop timer when find has finished
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Model.on('found', function onFound(options, documents) {
	if (options._debugObject) {
		options._debugObject.stop('Found ' + documents.length + ' documents');
	}
});