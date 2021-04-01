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

		let privateGroups = [],
			publicGroups = [],
			groupIds = [];

		// if there's a user logged in, this will get all the currently joined groups
		if (userId) {
			publicGroups = await Group.findAll({
				include: [{ model: User, where: { id: userId }, attributes: [] }],
				where: { isPublic: true },
				order: [["id", "ASC"]],
			});

			for (group of publicGroups) {
				group.dataValues["count"] = await UserGroupJoin.count({ where: { groupId: group.dataValues.id } });
				groupIds.push(group.dataValues.id);
			}

			privateGroups = await Group.findAll({
				include: [{ model: User, where: { id: userId }, attributes: [] }],
				where: { isPublic: false, id: { [Op.notIn]: groupIds } },
				order: [["id", "ASC"]],
			});
			for (group of privateGroups) {
				group.dataValues["count"] = await UserGroupJoin.count({ where: { groupId: group.dataValues.id } });
				groupIds.push(group.dataValues.id);
			}
		}
		// after this, it grabs all the unjoined groups.
		// this grabs any unjoined groups, for logged in/out users.

		let newPublicGroups = await Group.findAll({
			where: { isPublic: true, id: { [Op.notIn]: groupIds } },
			order: [["id", "ASC"]],
		});

		for (group of newPublicGroups) {
			group.dataValues["count"] = await UserGroupJoin.count({ where: { groupId: group.dataValues.id } });
			groupIds.push(group.dataValues.id);
		}

		let newPrivateGroups = await Group.findAll({
			where: { isPublic: false, id: { [Op.notIn]: groupIds } },
			order: [["id", "ASC"]],
		});
		for (group of newPrivateGroups) {
			group.dataValues["count"] = await UserGroupJoin.count({ where: { groupId: group.dataValues.id } });
		}

		return res.json({ publicGroups, privateGroups, newPublicGroups, newPrivateGroups });
	})
);

module.exports = GroupRouter;
