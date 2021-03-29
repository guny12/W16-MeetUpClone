"use strict";
module.exports = (sequelize, DataTypes) => {
	const EventComment = sequelize.define(
		"EventComment",
		{
			userId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: { model: "Users" },
			},
			eventId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: { model: "Events" },
			},
			content: {
				allowNull: false,
				type: DataTypes.STRING(255),
			},
		},
		{}
	);
	EventComment.associate = function (models) {
		EventComment.belongsTo(models.User, { foreignKey: "userId" });
		EventComment.belongsTo(models.Event, { foreignKey: "eventId" });
	};
	return EventComment;
};
