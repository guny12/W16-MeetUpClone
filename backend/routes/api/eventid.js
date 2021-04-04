const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { Group, Event, GroupComment, User, UserGroupJoin } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
// const { Op, UUID } = require("sequelize");
const eventIdRouter = express.Router();

eventIdRouter.patch(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const hostId = req.user.id;
		const { name, id, description, imgURL, location, eventDate, eventType, availableSpots } = req.body;
		await Event.update(
			{ name, id, description, imgURL, location, eventDate, eventType, availableSpots },
			{ where: { id, hostId } }
		);
		let {
			dataValues: { groupId },
		} = await Event.findByPk(id);

		return res.json({ id, groupId });
	})
);

eventIdRouter.delete(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const currentId = req.user.id;
		const { id } = req.body;
		const targetGroup = await Group.findByPk(id);
		if (targetGroup.adminId === currentId) {
			const targetUserJoinGroups = await UserGroupJoin.findAll({ where: { groupId: targetGroup.id } });
			for (userGroupJoin of targetUserJoinGroups) await userGroupJoin.destroy();
			await targetGroup.destroy();
		}
		return res.json({ id });
	})
);

eventIdRouter.post(
	"/",
	requireAuth,
	asyncHandler(async (req, res) => {
		const adminId = req.user.id;
		const { name, description, isPublic, imgURL } = req.body;
		const newGroup = await Group.create({ adminId, name, description, isPublic, imgURL });
		await UserGroupJoin.create({ userId: adminId, groupId: newGroup.id });
		return res.json({ newGroup });
	})
);

module.exports = eventIdRouter;
