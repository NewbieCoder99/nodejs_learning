/*
* @Author: Newbie Coder
* @Date:   2018-09-26 01:56:13
* @Last Modified by:   Newbie Coder
* @Last Modified time: 2018-09-28 23:54:16
*/
'use strict';

var Sequelize 	= require('sequelize'),
	dbname 		= process.env.DB_NAME,
	dbusername 	= process.env.DB_USERNAME,
	dbpassword  = process.env.DB_PASSWORD,
	connection 	= new Sequelize(dbname,dbusername,dbpassword, {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DRIVER,
		operatorsAliases: false,
		pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
	});

connection.Sequelize = Sequelize;

module.exports = connection;