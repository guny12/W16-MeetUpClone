"use strict";
module.exports = (sequelize, DataTypes) => {
	const Group = sequelize.define(
		"Group",
		{
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
				validate: {
					len: [1, 50],
				},
				unique: {
					args: true,
					msg: "Group name already in use!",
				},
			},
			adminId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "Users" } },
			description: { type: DataTypes.STRING(255), allowNull: false },
			isPublic: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
			imgURL: DataTypes.STRING,
		},
		{}
	);
	Group.associate = function (models) {
		const groupMapping = {
			through: "UserGroupJoin",
			foreignKey: "groupId",
			otherKey: "userId",
		};

		Group.belongsTo(models.User, { foreignKey: "adminId", as: "AdminId" });
		Group.hasMany(models.Event, { foreignKey: "groupId", onDelete: "CASCADE", hooks: true });
		Group.hasMany(models.GroupComment, { foreignKey: "groupId", onDelete: "CASCADE", hooks: true });
		Group.belongsToMany(models.User, groupMapping);
	};
	return Group;
};
