'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('books',
      [
        {
          name : 'Belajar Laravel',
          author : 'Qudrat Nurfajar Yasin Sutisna',
          createdAt : new Date(),
          updatedAt : new Date()
        }
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('books', null, {});
  }
};
