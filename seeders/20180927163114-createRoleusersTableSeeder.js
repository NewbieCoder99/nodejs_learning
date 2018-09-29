'use strict';

var dateTime = require('node-datetime').create();
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Role_users', [{
      userId: 1,
      roleId: 1,
      createdAt : dateTime.format('Y-m-d H:M:S'),
      updatedAt : dateTime.format('Y-m-d H:M:S')
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Role_users', null, {});
  }
};
