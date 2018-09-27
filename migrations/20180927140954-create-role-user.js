'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('role_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        UNSIGNED : true
      },
      role_id: {
        type: Sequelize.INTEGER,
        UNSIGNED : true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addConstraint('role_users', ['user_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_users', // useful if using queryInterface.removeConstraint
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: null,
      onUpdate: null,
    }))
    .then(() => queryInterface.addConstraint('role_users', ['role_id'], {
          type: 'FOREIGN KEY',
          name: 'FK_roles', // useful if using queryInterface.removeConstraint
          references: {
            table: 'roles',
            field: 'id',
          },
          onDelete: null,
          onUpdate: null,
        }))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('role_users');
  }
};