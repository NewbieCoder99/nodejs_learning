'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Role_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      roleId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    })
    .then(() => queryInterface.addConstraint('Role_users', ['userId'], {
          type: 'FOREIGN KEY',
          name: 'FK_users', // useful if using queryInterface.removeConstraint
          references: {
            table: 'Users',
            field: 'id',
          },
          onDelete: null,
          onUpdate: null,
    }))
    .then(() => queryInterface.addConstraint('Role_users', ['roleId'], {
          type: 'FOREIGN KEY',
          name: 'FK_roles', // useful if using queryInterface.removeConstraint
          references: {
            table: 'Roles',
            field: 'id',
          },
          onDelete: null,
          onUpdate: null,
    }))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Role_users');
  }
};