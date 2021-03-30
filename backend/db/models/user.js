"use strict";
const { Validator, Op } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [4, 30],
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error("Cannot be an email.");
						}
					},
				},
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 30],
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 30],
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [3, 256],
				},
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60],
				},
			},
		},
		{
			defaultScope: {
				attributes: {
					exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
				},
			},
			scopes: {
				currentUser: {
					attributes: { exclude: ["hashedPassword"] },
				},
				loginUser: {
					attributes: {},
				},
			},
		}
	);

	User.prototype.validatePassword = function (password) {
		return bcrypt.compareSync(password, this.hashedPassword.toString());
	};

	User.prototype.toSafeObject = function () {
		// remember, this cannot be an arrow function
		const { id, username, email, firstName, lastName } = this; // context will be the User instance
		return { id, username, email, firstName, lastName };
	};

	User.getCurrentUserById = async function (id) {
		return await User.scope("currentUser").findByPk(id);
	};

	User.login = async function ({ credential, password }) {
		// require Op from sequelize above
		const user = await User.scope("loginUser").findOne({
			where: {
				[Op.or]: {
					username: credential,
					email: credential,
				},
			},
		});
		if (user && user.validatePassword(password)) {
			return await User.scope("currentUser").findByPk(user.id);
		}
	};

	User.signup = async function ({ username, email, password, firstName, lastName }) {
		// required bcrypt from bcryptjs
		const hashedPassword = bcrypt.hashSync(password);
		const user = await User.create({
			username,
			email,
			hashedPassword,
			firstName,
			lastName,
		});
		return await User.scope("currentUser").findByPk(user.id);
	};

	User.associate = function (models) {
		const userMapping = {
			through: "UserJoin",
			foreignKey: "userId",
			otherKey: "followerId",
			as: "followers",
		};

		const followerMapping = {
			through: "UserJoin",
			foreignKey: "followerId",
			otherKey: "userId",
			as: "user",
		};

		const groupMapping = {
			through: "UserGroupJoin",
			foreignKey: "userId",
			otherKey: "groupId",
		};

		const columnMapping = {
			through: "EventAttendee",
			foreignKey: "attendeeId",
			otherKey: "eventId",
		};

		User.belongsToMany(models.User, userMapping);
		User.belongsToMany(models.User, followerMapping);
		User.hasMany(models.Group, { foreignKey: "adminId" });
		User.hasMany(models.Event, { foreignKey: "hostId" });
		User.hasMany(models.EventComment, { foreignKey: "userId" });
		User.hasMany(models.GroupComment, { foreignKey: "userId" });
		User.belongsToMany(models.Group, groupMapping);
		User.belongsToMany(models.Event, columnMapping);
	};
	return User;
};
