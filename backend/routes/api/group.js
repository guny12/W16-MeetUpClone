const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { Group, Event, GroupComment, User, UserGroupJoin } = require("../../db/models");
const { restoreUser, requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");
const GroupRouter = express.Router();

// route to get groups
GroupRouter.get(
	"/",
	restoreUser,
	asyncHandler(async (req, res) => {
		// send the userId in req, to pull out the groups that they are a part of.
		if (req.user) var userId = req.user.id;

		let privateGroups = [],
			publicGroups = [],
			joinedGroupIds = [];

		// if there's a user logged in, this will get all the currently joined groups
		// clean up the querying and updating used GroupIds and AdminName into a single func later
		if (userId) {
			publicGroups = await Group.findAll({
				include: [
					{
						model: User,
						where: { id: userId },
						attributes: [],
					},
				],
				where: { isPublic: true },
				order: [["id", "ASC"]],
			});

			for (group of publicGroups) {
				group.dataValues["count"] = await UserGroupJoin.count({ where: { groupId: group.dataValues.id } });
				let owner = await User.findOne({ where: { id: group.dataValues.adminId }, attributes: ["firstName"] });
				group.dataValues["adminName"] = owner.firstName;
				joinedGroupIds.push(group.dataValues.id);
			}

			privateGroups = await Group.findAll({
				include: [
					{
						model: User,
						where: { id: userId },
						attributes: [],
					},
				],
				where: { [Op.and]: [{ isPublic: false, id: { [Op.notIn]: joinedGroupIds } }] },
				order: [["id", "ASC"]],
			});
			for (group of privateGroups) {
				group.dataValues["count"] = await UserGroupJoin.count({ where: { groupId: group.dataValues.id } });
				let owner = await User.findOne({ where: { id: group.dataValues.adminId }, attributes: ["firstName"] });
				group.dataValues["adminName"] = owner.firstName;
				joinedGroupIds.push(group.dataValues.id);
			}
		}
		// after this, it grabs all the unjoined groups.
		// this grabs any unjoined groups, for logged in/out users.

		let newPublicGroups = await Group.findAll({
			where: { isPublic: true, id: { [Op.notIn]: joinedGroupIds } },
			order: [["id", "ASC"]],
		});

		for (group of newPublicGroups) {
			group.dataValues["count"] = await UserGroupJoin.count({ where: { groupId: group.dataValues.id } });
			let owner = await User.findOne({ where: { id: group.dataValues.adminId }, attributes: ["firstName"] });
			group.dataValues["adminName"] = owner.firstName;
		}

		let newPrivateGroups = await Group.findAll({
			where: { isPublic: false, id: { [Op.notIn]: joinedGroupIds } },
			order: [["id", "ASC"]],
		});
		for (group of newPrivateGroups) {
			group.dataValues["count"] = await UserGroupJoin.count({ where: { groupId: group.dataValues.id } });
			let owner = await User.findOne({ where: { id: group.dataValues.adminId }, attributes: ["firstName"] });
			group.dataValues["adminName"] = owner.firstName;
		}

		return res.json({ publicGroups, privateGroups, newPublicGroups, newPrivateGroups, joinedGroupIds });
	})
);

// route to set UserGroup Joins
GroupRouter.post(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const { id } = req.body.group;
		const alreadyJoined = await UserGroupJoin.count({ where: { userId, groupId: id } });
		if (!alreadyJoined) await UserGroupJoin.create({ userId, groupId: id });

		return res.json({ id });
	})
);

module.exports = GroupRouter;
// publicGroups = await Group.findAll({
// 	include: [
// 		{
// 			model: User,
// 			where: { id: userId },
// 			attributes: [],
// 		},
// 	],
// 	where: { [Op.or]: [{ isPublic: true }, { adminId: userId }] },
// 	order: [["id", "ASC"]],
// });
