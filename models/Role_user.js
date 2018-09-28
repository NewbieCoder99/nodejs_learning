'use strict';
module.exports = (sequelize, DataTypes) => {

	const Role_users = sequelize.define('Role_users', {
		userId: DataTypes.INTEGER,
		roleId: DataTypes.INTEGER
	}, {});
	Role_users.associate = function(models) {
		Role_users.belongsTo(models.Roles);
	};
	return Role_users;
};