'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    username: DataTypes.STRING
  }, {});
  user.associate = function(models) {
  };
  return user;
};