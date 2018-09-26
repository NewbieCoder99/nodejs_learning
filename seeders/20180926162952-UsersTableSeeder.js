'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users',
      [
        {
          name: 'Qudrat Nurfajar Yasin Sutisna',
          username : 'qudrat99',
          createdAt : new Date(),
          updatedAt : new Date()
        },
        {
          name: 'Qudrat Nurfajar Yasin Sutisna',
          username : 'admin',
          createdAt : new Date(),
          updatedAt : new Date()
        },
      ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});    
  }
};
