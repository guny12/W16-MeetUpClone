"use strict";
const faker = require("faker");
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"GroupComments",
			[
				{
					userId: 1,
					groupId: 1,
					content: faker.lorem.sentence(),
				},
				{
					userId: 1,
					groupId: 2,
					content: faker.lorem.sentence(),
				},
				{
					userId: 1,
					groupId: 3,
					content: faker.lorem.sentence(),
				},
				{
					userId: 2,
					groupId: 1,
					content: faker.lorem.sentence(),
				},
				{
					userId: 2,
					groupId: 2,
					content: faker.lorem.sentence(),
				},
				{
					userId: 2,
					groupId: 3,
					content: faker.lorem.sentence(),
				},
				{
					userId: 3,
					groupId: 1,
					content: faker.lorem.sentence(),
				},
				{
					userId: 3,
					groupId: 2,
					content: faker.lorem.sentence(),
				},
				{
					userId: 3,
					groupId: 3,
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
			"GroupComments",
			null,
			{}
		);
	},
};
