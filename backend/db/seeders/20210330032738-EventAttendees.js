"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"EventAttendees",
			[
				{
					attendeeId: 1,
					eventId: 1,
				},
				{
					attendeeId: 2,
					eventId: 1,
				},
				{
					attendeeId: 2,
					eventId: 2,
				},
				{
					attendeeId: 3,
					eventId: 1,
				},
				{
					attendeeId: 3,
					eventId: 2,
				},
				{
					attendeeId: 3,
					eventId: 3,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("EventAttendees", null, {});
	},
};
