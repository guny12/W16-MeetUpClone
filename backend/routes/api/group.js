const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { Group, Event, GroupComment, User, UserGroupJoin } = require("../../db/models");
const { restoreUser } = require("../../utils/auth");
const { Op } = require("sequelize");
const GroupRouter = express.Router();

GroupRouter.get(
	"/",
	restoreUser,
	asyncHandler(async (req, res) => {
		// send the userId in req, to pull out the groups that they are a part of.
		if (req.user) var userId = req.user.id;

		const publicGroups = await Group.findAll({
			include: [{ model: User, where: { id: userId }, attributes: [] }],
			where: { isPublic: true },
			order: [["id", "ASC"]],
		});

		let groupIds = [];
		for (group of publicGroups) {
			group.dataValues["count"] = await UserGroupJoin.count({ where: { groupId: group.dataValues.id } });
			groupIds.push(group.dataValues.id);
		}

		let privateGroups = [];
		if (userId) {
			privateGroups = await Group.findAll({
				include: [{ model: User, where: { id: userId }, attributes: [] }],
				where: { id: { [Op.notIn]: groupIds } },
				order: [["id", "ASC"]],
			});
			for (group of privateGroups) {
				group.dataValues["count"] = await UserGroupJoin.count({ where: { groupId: group.dataValues.id } });
			}
		}

		return res.json({ publicGroups, privateGroups });
	})
);

module.exports = GroupRouter;
