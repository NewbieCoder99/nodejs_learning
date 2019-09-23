'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING,
        unique : true,
      },
      content: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then( ()  => queryInterface.addConstraint('Articles', ['categoryId'], {
        type: 'FOREIGN KEY',
        name: 'FK_articles_categories',
        references: {
          table: 'Categories',
          field: 'id',
        },
        onDelete: null,
        onUpdate: null,
      })
    ).then( ()  => queryInterface.addConstraint('Articles', ['userId'], {
        type: 'FOREIGN KEY',
        name: 'FK_articles_users',
        references: {
          table: 'Users',
          field: 'id',
        },
        onDelete: null,
        onUpdate: null,
      })
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Articles');
  }
};