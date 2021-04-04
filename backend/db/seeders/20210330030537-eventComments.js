"use strict";
const faker = require("faker");

let eventcomments = [];
for (let i = 1; i < 12; i++) {
	eventcomments.push({
		attendeeId: 1,
		eventId: i,
		content: faker.lorem.sentence(),
	});
}
for (let i = 1; i < 24; i++) {
	eventcomments.push({
		attendeeId: 2,
		eventId: i,
		content: faker.lorem.sentence(),
	});
}
for (let i = 1; i < 24; i++) {
	eventcomments.push({
		userId: 3,
		eventId: i,
		content: faker.lorem.sentence(),
	});
}
for (let i = 1; i < 24; i++) {
	eventcomments.push({
		attendeeId: 4,
		eventId: i,
		content: faker.lorem.sentence(),
	});
}
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("EventComments", eventcomments, {});
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */ return queryInterface.bulkDelete(
			"EventComments",
			null,
			{}
		);
	},
};
