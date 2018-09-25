/*
* @Author: Newbie Coder
* @Date:   2018-09-26 01:56:13
* @Last Modified by:   Newbie Coder
* @Last Modified time: 2018-09-26 03:01:59
*/
const Sequelize = require('sequelize');
const dotenv 	= require('dotenv').config();
// Or you can simply use a connection uri
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

var connection = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
{
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: process.env.DB_DRIVER, // mysql|'sqlite'|'postgres'|'mssql'
	operatorsAliases: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
  	// storage: 'path/to/database.sqlite'
});

// connection.authenticate().then(() => {
// 	console.log('Connection has been established successfully.');
// }).catch(err => {
// 	console.error('Unable to connect to the database:', err);
// });

// connection.Sequelize = Sequelize;

module.exports = connection;