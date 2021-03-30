"use strict";
const faker = require("faker");
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"EventComments",
			[
				{
					userId: 1,
					eventId: 1,
					content: faker.lorem.sentence(),
				},
				{
					userId: 1,
					eventId: 2,
					content: faker.lorem.sentence(),
				},
				{
					userId: 1,
					eventId: 3,
					content: faker.lorem.sentence(),
				},
				{
					userId: 2,
					eventId: 1,
					content: faker.lorem.sentence(),
				},
				{
					userId: 2,
					eventId: 2,
					content: faker.lorem.sentence(),
				},
				{
					userId: 2,
					eventId: 3,
					content: faker.lorem.sentence(),
				},
				{
					userId: 3,
					eventId: 1,
					content: faker.lorem.sentence(),
				},
				{
					userId: 3,
					eventId: 2,
					content: faker.lorem.sentence(),
				},
				{
					userId: 3,
					eventId: 3,
					content: faker.lorem.sentence(),
				},
			],
			{}
		);
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
