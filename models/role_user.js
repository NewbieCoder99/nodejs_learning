'use strict';
module.exports = (sequelize, DataTypes) => {
  const role_user = sequelize.define('role_user', {
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {});
  role_user.associate = function(models) {
    // associations can be defined here
  };
  return role_user;
};