'use strict';
module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define('books', {
    name: DataTypes.STRING,
    author: DataTypes.STRING
  }, {});
  books.associate = function(models) {
    // associations can be defined here
  };
  return books;
};