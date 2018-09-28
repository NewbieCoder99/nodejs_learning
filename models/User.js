'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    username 	: DataTypes.STRING,
    password 	: DataTypes.STRING,
    email 		: DataTypes.STRING
  }, {});
  	Users.associate = function(models) {
  		Users.hasOne(models.Role_users);
  	};
  return Users;
};