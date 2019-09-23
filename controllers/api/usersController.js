'use strict';

const checkSession = require('../../libraries/checkSession');
const xhrRequest = require('../../libraries/xhrRequest');
const model = require('../../models');
const datatable = require(`sequelize-datatable`);

exports.getAll = function(req, res, next) {

	/*
	* Check Session
	*/
	checkSession.test(req,res);

	/*
	* Check request required
	*/
	xhrRequest.test(req,res);

	/*
	* Sequelize Datatable
	*/
	datatable(model.User, req.query, {
		// Todo
	}).then((result) => {
		res.json(result);
	});

}