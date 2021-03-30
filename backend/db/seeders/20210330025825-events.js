"use strict";
const faker = require("faker");

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Events",
			[
				{
					name: "Sushi cook off",
					hostId: 4,
					groupId: 1,
					location: faker.address.streetAddress(),
					description: faker.lorem.paragraph(),
					eventDate: faker.date.soon(),
					eventType: "cook off",
					availableSpots: faker.random.number(),
					imgURL: faker.image.imageUrl(),
				},
				{
					name: "Robatayaki cook off",
					hostId: 4,
					groupId: 1,
					location: faker.address.streetAddress(),
					description: faker.lorem.paragraph(),
					eventDate: faker.date.soon(),
					eventType: "cook off",
					availableSpots: faker.random.number(),
					imgURL: faker.image.imageUrl(),
				},
				{
					name: "Casual experimentation",
					hostId: 4,
					groupId: 3,
					location: faker.address.streetAddress(),
					description: faker.lorem.paragraph(),
					eventDate: faker.date.soon(),
					eventType: "experimentation",
					availableSpots: faker.random.number(),
					imgURL: faker.image.imageUrl(),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Events", null, {});
	},
};
