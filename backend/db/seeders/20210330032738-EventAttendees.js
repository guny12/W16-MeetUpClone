"use strict";

let attendees = [];
for (let i = 1; i < 12; i++) {
	attendees.push({
		attendeeId: 1,
		eventId: i,
	});
}
for (let i = 1; i < 24; i++) {
	attendees.push({
		attendeeId: 2,
		eventId: i,
	});
}
for (let i = 1; i < 24; i++) {
	attendees.push({
		attendeeId: 3,
		eventId: i,
	});
}
for (let i = 1; i < 24; i++) {
	attendees.push({
		attendeeId: 4,
		eventId: i,
	});
}

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("EventAttendees", attendees, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("EventAttendees", null, {});
	},
};
