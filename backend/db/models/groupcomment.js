"use strict";
module.exports = (sequelize, DataTypes) => {
	const GroupComment = sequelize.define(
		"GroupComment",
		{
			userId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: { model: "Users" },
			},
			groupId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: { model: "Groups" },
			},
			content: {
				allowNull: false,
				type: DataTypes.STRING(255),
			},
		},
		{}
	);
	GroupComment.associate = function (models) {
		GroupComment.belongsTo(models.User, { foreignKey: "userId" });
		GroupComment.belongsTo(models.Group, { foreignKey: "groupId" });
	};
	return GroupComment;
};
