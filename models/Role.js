'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    role_name: DataTypes.STRING
  }, {});
  Roles.associate = function(models) {
    // Roles.belongsTo(models.Role_users);
  };
  return Roles;
};