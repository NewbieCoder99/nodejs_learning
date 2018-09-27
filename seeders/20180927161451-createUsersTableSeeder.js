'use strict';

const   crypto  = require('crypto'),
        dotenv  = require('dotenv').config(),
        secret  = process.env.PASSWORD_SECRET;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        username : 'admin',
        password : crypto.createHmac('sha256', secret)
                   .update('password').digest('hex'),
        email: 'admin@admin.com'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};