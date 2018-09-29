'use strict';

const   crypto  = require('crypto'),
        dotenv  = require('dotenv').config(),
        secret  = process.env.PASSWORD_SECRET;

var dateTime = require('node-datetime').create();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        username : 'admin',
        password : crypto.createHmac('sha256', secret)
                   .update('password').digest('hex'),
        email: 'admin@admin.com',
          createdAt : dateTime.format('Y-m-d H:M:S'),
          updatedAt : dateTime.format('Y-m-d H:M:S')
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};