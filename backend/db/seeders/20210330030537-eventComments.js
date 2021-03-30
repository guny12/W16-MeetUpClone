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
					content: faker.lorem.paragraph(),
				},
				{
					userId: 1,
					eventId: 2,
					content: faker.lorem.paragraph(),
				},
				{
					userId: 1,
					eventId: 3,
					content: faker.lorem.paragraph(),
				},
				{
					userId: 2,
					eventId: 1,
					content: faker.lorem.paragraph(),
				},
				{
					userId: 2,
					eventId: 2,
					content: faker.lorem.paragraph(),
				},
				{
					userId: 2,
					eventId: 3,
					content: faker.lorem.paragraph(),
				},
				{
					userId: 3,
					eventId: 1,
					content: faker.lorem.paragraph(),
				},
				{
					userId: 3,
					eventId: 2,
					content: faker.lorem.paragraph(),
				},
				{
					userId: 3,
					eventId: 3,
					content: faker.lorem.paragraph(),
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
