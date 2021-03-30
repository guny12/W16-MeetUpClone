"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("GroupComments", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: "Users" },
			},
			groupId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: "Groups" },
			},
			content: {
				allowNull: false,
				type: Sequelize.STRING(255),
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("GroupComments");
	},
};
