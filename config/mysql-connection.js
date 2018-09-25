/*
* @Author: Newbie Coder
* @Date:   2018-09-26 01:46:06
* @Last Modified by:   Newbie Coder
* @Last Modified time: 2018-09-26 02:04:28
*/
var mysql 	= require('mysql'),
	dotenv 	= require('dotenv').config();

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;