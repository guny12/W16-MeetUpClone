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
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("UserGroupJoins", null, {});
	},
};
