"use strict";
module.exports = (sequelize, DataTypes) => {
	const Event = sequelize.define(
		"Event",
		{
			name: { type: DataTypes.STRING(50), allowNull: false },
			hostId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: { model: "Users" },
			},
			groupId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: { model: "Groups" },
			},
			location: DataTypes.STRING(255),
			description: {
				allowNull: false,
				type: DataTypes.TEXT,
			},
			eventDate: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			eventType: {
				allowNull: false,
				type: DataTypes.STRING(30),
			},
			availableSpots: {
				allowNull: false,
				type: DataTypes.INTEGER,
			},
			imgURL: DataTypes.STRING,
		},
		{}
	);
	Event.associate = function (models) {
		Event.belongsTo(models.User, { foreignKey: "hostId" });
		Event.belongsTo(models.Group, { foreignKey: "groupId" });
	};
	return Event;
};
