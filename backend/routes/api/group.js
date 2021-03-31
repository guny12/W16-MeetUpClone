const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { Group, Event, GroupComment, User } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");
const GroupRouter = express.Router();

GroupRouter.get(
	"/",
	// requireAuth,
	asyncHandler(async (req, res) => {
		// send the userId in req, to pull out the groups that they are a part of.
		if (req.user) var userId = req.user.id;

		const publicGroups = await Group.findAll({
			where: { isPublic: true },
			limit: 7,
			order: [["id", "ASC"]],
		});

		let privateGroups = [];
		if (userId) {
			privateGroups = await Group.findAll({
				include: [{ model: User, where: { id: userId }, attributes: [] }],
				limit: 3,
				order: [["id", "ASC"]],
			});
		}

		return res.json({ publicGroups, privateGroups });
	})
);

module.exports = GroupRouter;
