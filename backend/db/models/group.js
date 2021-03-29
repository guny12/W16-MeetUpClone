"use strict";
module.exports = (sequelize, DataTypes) => {
	const Group = sequelize.define(
		"Group",
		{
			name: { type: DataTypes.STRING(50), allowNull: false },
			adminId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "Users" } },
			description: { type: DataTypes.STRING(255), allowNull: false },
			isPublic: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
			imgURL: DataTypes.STRING,
		},
		{}
	);
	Group.associate = function (models) {
		Group.belongsTo = (models.User, { foreignKey: "adminId", as: "adminId" });
	};
	return Group;
};
