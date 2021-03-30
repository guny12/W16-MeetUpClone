"use strict";
module.exports = (sequelize, DataTypes) => {
	const UserGroupJoin = sequelize.define(
		"UserGroupJoin",
		{
			userId: DataTypes.INTEGER,
			groupId: DataTypes.INTEGER,
		},
		{}
	);
	UserGroupJoin.associate = function (models) {
		// associations can be defined here
	};
	return UserGroupJoin;
};
