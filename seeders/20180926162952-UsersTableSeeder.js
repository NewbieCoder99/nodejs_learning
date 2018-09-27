'use strict';

const crypto = require('crypto'),
      dotenv = require('dotenv').config(),
      secret = process.env.PASSWORD_SECRET;

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users',
      [
        {
          name      : 'Qudrat Nurfajar Yasin Sutisna',
          username  : 'qudrat99',
          password  :  crypto.createHmac('sha256', secret)
                      .update('password').digest('hex'),
          createdAt : new Date(),
          updatedAt : new Date()
        },
        {
          name      : 'Aira Airaha',
          username  : 'admin',
          password  :  crypto.createHmac('sha256', secret)
                      .update('password').digest('hex'),
          createdAt : new Date(),
          updatedAt : new Date()
        },
      ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});    
  }
};
