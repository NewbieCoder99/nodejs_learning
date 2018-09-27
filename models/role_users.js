'use strict';
module.exports = (sequelize, DataTypes) => {

	const Role_users = sequelize.define('Role_users', {
		userId: {
			type : DataTypes.INTEGER,
			references: {
			  model: "Users",
			  key: "id"
			}
		},
		roleId: DataTypes.INTEGER
	}, {});
	Role_users.associate = function(models) {
		// TODO
	};
	return Role_users;
};