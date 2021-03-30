"use strict";
module.exports = (sequelize, DataTypes) => {
	const EventAttendee = sequelize.define(
		"EventAttendee",
		{
			attendeeId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: { model: "Users" },
			},
			eventId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: { model: "Events" },
			},
		},
		{}
	);
	EventAttendee.associate = function (models) {};
	return EventAttendee;
};
