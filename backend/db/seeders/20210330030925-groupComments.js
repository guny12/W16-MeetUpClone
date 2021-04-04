"use strict";
const faker = require("faker");

let groupcomments = [];
for (let i = 1; i < 12; i++) {
	groupcomments.push({
		userId: 1,
		eventId: i,
		content: faker.lorem.sentence(),
	});
}
for (let i = 1; i < 24; i++) {
	groupcomments.push({
		userId: 2,
		eventId: i,
		content: faker.lorem.sentence(),
	});
}
for (let i = 1; i < 24; i++) {
	groupcomments.push({
		userId: 3,
		groupId: i,
		content: faker.lorem.sentence(),
	});
}
for (let i = 1; i < 24; i++) {
	groupcomments.push({
		userId: 4,
		eventId: i,
		content: faker.lorem.sentence(),
	});
}
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("GroupComments", groupcomments, {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("GroupComments", null, {});
	},
};
