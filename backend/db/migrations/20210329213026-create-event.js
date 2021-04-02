"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Events", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING(50),
			},
			hostId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: "Users" },
			},
			groupId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: "Groups" },
			},
			location: {
				type: Sequelize.STRING(255),
			},
			description: {
				allowNull: false,
				type: Sequelize.TEXT,
			},
			eventDate: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			eventType: {
				allowNull: false,
				type: Sequelize.STRING(30),
			},
			availableSpots: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			imgURL: {
				type: Sequelize.STRING,
				defaultValue: "/static/media/CookOffPic.343f3730.png",
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
		return queryInterface.dropTable("Events");
	},
};
