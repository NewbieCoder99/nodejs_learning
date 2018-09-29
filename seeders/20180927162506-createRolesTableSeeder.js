'use strict';

var dateTime = require('node-datetime').create();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
        {
        	role_name : 'admin',
          createdAt : dateTime.format('Y-m-d H:M:S'),
          updatedAt : dateTime.format('Y-m-d H:M:S')
        },
        {
        	role_name : 'user',
          createdAt : dateTime.format('Y-m-d H:M:S'),
          updatedAt : dateTime.format('Y-m-d H:M:S')
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};