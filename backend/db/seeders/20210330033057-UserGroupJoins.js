"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"UserGroupJoins",
			[
				{
					userId: 1,
					groupId: 1,
				},
				{
					userId: 1,
					groupId: 2,
				},
				{
					userId: 1,
					groupId: 3,
				},
				{
					userId: 1,
					groupId: 4,
				},
				{
					userId: 1,
					groupId: 5,
				},
				{
					userId: 1,
					groupId: 6,
				},
				{
					userId: 1,
					groupId: 7,
				},
				{
					userId: 1,
					groupId: 8,
				},
				{
					userId: 1,
					groupId: 9,
				},
				{
					userId: 1,
					groupId: 10,
				},
				{
					userId: 1,
					groupId: 11,
				},
				{
					userId: 1,
					groupId: 12,
				},
				{
					userId: 1,
					groupId: 13,
				},
				{
					userId: 2,
					groupId: 1,
				},
				{
					userId: 2,
					groupId: 2,
				},
				{
					userId: 2,
					groupId: 3,
				},
				{
					userId: 3,
					groupId: 1,
				},
				{
					userId: 3,
					groupId: 2,
				},
				{
					userId: 3,
					groupId: 3,
				},
				{
					userId: 4,
					groupId: 1,
				},
				{
					userId: 4,
					groupId: 2,
				},
				{
					userId: 4,
					groupId: 3,
				},
				{
					userId: 4,
					groupId: 4,
				},
				{
					userId: 4,
					groupId: 5,
				},
				{
					userId: 4,
					groupId: 6,
				},
				{
					userId: 4,
					groupId: 7,
				},
				{
					userId: 4,
					groupId: 8,
				},
				{
					userId: 4,
					groupId: 9,
				},
				{
					userId: 4,
					groupId: 10,
				},
				{
					userId: 4,
					groupId: 11,
				},
				{
					userId: 4,
					groupId: 12,
				},
				{
					userId: 4,
					groupId: 13,
				},
				{
					userId: 4,
					groupId: 14,
				},
				{
					userId: 4,
					groupId: 15,
				},
				{
					userId: 4,
					groupId: 16,
				},
				{
					userId: 4,
					groupId: 17,
				},
				{
					userId: 4,
					groupId: 18,
				},
				{
					userId: 4,
					groupId: 19,
				},
				{
					userId: 4,
					groupId: 20,
				},
				{
					userId: 4,
					groupId: 21,
				},
				{
					userId: 4,
					groupId: 22,
				},
				{
					userId: 4,
					groupId: 23,
				},
				{
					userId: 4,
					groupId: 24,
				},
				{
					userId: 4,
					groupId: 25,
				},
				{
					userId: 4,
					groupId: 26,
				},
				{
					userId: 4,
					groupId: 27,
				},
				{
					userId: 4,
					groupId: 28,
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("UserGroupJoins", null, {});
	},
};
