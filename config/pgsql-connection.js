/*
* @Author: Newbie Coder
* @Date:   2018-09-26 01:46:06
* @Last Modified by:   Newbie Coder
* @Last Modified time: 2018-09-26 02:05:02
*/
var pgp 	= require('pg-promise'),
	dotenv 	= require('dotenv').config(),
	dbhost 	= process.env.DB_HOST,
	dbport 	= process.env.DB_PORT,
	dbuser 	= process.env.DB_USERNAME,
	dbpass 	= process.env.DB_PASSWORD,
	dbname 	= process.env.DB_NAME,
	setup 	= 'postgres://'+dbuser+':'+dbpass+'@'+dbhost+':'+dbport+'/'+dbname,
	connection 	= pgp(setup);

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;