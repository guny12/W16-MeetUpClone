"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Followers",
			[
				{
					userId: 1,
					followerId: 2,
				},
				{
					userId: 1,
					followerId: 3,
				},
				{
					userId: 2,
					followerId: 1,
				},
				{
					userId: 2,
					followerId: 3,
				},
				{
					userId: 3,
					followerId: 1,
				},
				{
					userId: 3,
					followerId: 2,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Followers", null, {});
	},
};
