'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('roles',
      [
        {
          role_name : 'admin',
          createdAt : new Date(),
          updatedAt : new Date()
        },
        {
          role_name : 'user',
          createdAt : new Date(),
          updatedAt : new Date()
        },
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
