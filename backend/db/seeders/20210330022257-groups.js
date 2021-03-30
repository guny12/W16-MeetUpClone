"use strict";
const faker = require("faker");

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Groups",
			[
				{
					name: "Japanese Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: faker.image.imageUrl(),
				},
				{
					name: "French Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: faker.image.imageUrl(),
				},
				{
					name: "Chinese Cuisine",
					adminId: 4,
					description: faker.lorem.sentence(),
					isPublic: true,
					imgURL: faker.image.imageUrl(),
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
			"Groups",
			null,
			{}
		);
	},
};
